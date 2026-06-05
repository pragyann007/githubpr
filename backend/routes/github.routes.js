import { Router } from "express";
import { GithubApp } from "../models/gitHubApp.model.js";

export const githubRouter = Router();

githubRouter.post('/install',async (req,res)=>{
    const {userId,githubId,installationId} = req.body;

    console.log("Received GitHub App installation request for userId:", userId, "with installationId:", installationId, "and githubId:", githubId);


    if(!userId || !installationId || !githubId){
        return res.status(400).json({
            error:"userId , githubId  and installationId are required"
        })
    }

    const existingApp = await GithubApp.findOne({userId,githubId,installationId});

    if(existingApp){
        existingApp.installationId = installationId;
        await existingApp.save();
        return res.status(200).json({
            message:"GitHub App installation updated successfully"
        })
    }

    const gitHubApp = new GithubApp({
        userId,
        githubId,
        installationId,
    })
    await gitHubApp.save();

    console.log("GitHub App installed successfully for userId:", userId, "with installationId:", installationId);
    res.status(200).json({
        message:"GitHub App installed successfully"
    })

})