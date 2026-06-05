import { Router } from "express";
import axios from "axios";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

const authRouter = Router();

authRouter.get("/github", (req, res) => {
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=read:user user:email`;

  res.redirect(githubAuthUrl);
});

authRouter.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      error: "Authorization code not provided",
    });
  }

  try {

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).json({
        error: "Failed to obtain access token",
        data: tokenResponse.data,
      });
    }

  
    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );


    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const primaryEmail =
      emailResponse.data.find((email) => email.primary)?.email ||
      emailResponse.data[0]?.email ||
      null;

    const {
      id,
      login,
      avatar_url,
      name,
      html_url,
    } = userResponse.data;

    const user = {
      id,
      username: login,
      name,
      email: primaryEmail,
      avatar_url,
      profile_url: html_url,
    };

    const saveUser = await User.findOne({githubId:id.toString()})

    if(!saveUser){
        const newUser = new User({
            githubId: id.toString(),
            username: login,
            email: primaryEmail,
            avatarUrl: avatar_url,
        })
        await newUser.save()
        console.log("New user created:");
    }

    const token = jwt.sign(
      {
        userId:saveUser._id ,
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    // res.status(200).json({
    //   message: "Authentication successful",
    //   user,
    //   token,
    // });
  
    res.redirect("http://localhost:5173")
  } catch (error) {
    console.error(
      "GitHub OAuth Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "GitHub authentication failed",
      details: error.response?.data || error.message,
    });
  }
});

authRouter.get("/getCurrentUser", async (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            error: "Unauthorized",
        })
    }

    const decoded = jwt.verify(token,"your_jwt_secret");

    return res.status(200).json({
        user: decoded,
    })

})

authRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully",
    })
})

export default authRouter;