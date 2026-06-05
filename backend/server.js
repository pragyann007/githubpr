import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
import cors from "cors"
import {App} from "@octokit/app"
import fs from "fs"
import { registerWebhooks } from "./services/gitHubApp.service.js";
import { githubRouter } from "./routes/github.routes.js";



dotenv.config()


const app = express()

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
connectDb()
// errors are coming bt 

export const gitHubApp = new App({
    appId: process.env.GITHUB_APP_ID,
    privateKey: fs.readFileSync("./keys/git-set-review-pr.2026-06-04.private-key.pem", "utf-8"),
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    webhooks:{
        secret: process.env.GITHUB_APP_WEBHOOK_SECRET,
    }
})

app.post("/api/github/webhooks",express.raw({type:"application/json"}),async (req,res)=>{
    console.log("Received GitHub webhook request with headers:")

    try {
        console.log("Received GitHub webhook:", {
            id: req.headers["x-github-delivery"],
            name: req.headers["x-github-event"],
        
        })
        console.log("Verifying webhook signature...")
        await gitHubApp.webhooks.verifyAndReceive({
            id: req.headers["x-github-delivery"],
            name: req.headers["x-github-event"],
            payload: req.body.toString("utf-8"),
            signature: req.headers["x-hub-signature-256"],
        })

        console.log("verified....")
        res.status(200).send("Webhook received")
        
    } catch (error) {
        console.log("Error processing GitHub webhook:", error)
        
    }


})


app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
  });

app.use("/api/auth",authRouter);

// making sure the workingg
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is healthy"
    })
})



app.get("/", (req, res) => {
    res.send("Hello World!")
})
registerWebhooks()

app.use("/api/github",githubRouter)





// app.post("/api/github/webhooks", async (req, res) => {
//     try {
//       console.log("Event:", req.headers["x-github-event"]);
//       console.log("Action:", req.body.action);
  
//       res.status(200).send("OK");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

