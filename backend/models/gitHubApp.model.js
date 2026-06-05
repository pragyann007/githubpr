import mongoose from "mongoose";

const githubAppScehma = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    githubId:{
        type:String,
        required:true,
    },
    installationId:{
        type:String,
        required:true,
    }

},{timestamps:true})


export const GithubApp = mongoose.model("GithubApp",githubAppScehma);
