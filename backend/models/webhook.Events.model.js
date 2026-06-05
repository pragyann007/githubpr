import mongoose from "mongoose";

const webHookEventSchema = new mongoose.Schema({
    installationId: {
        type: Number,
        required: true
    },
    repoName: {
        type: String,
        required: true
    },
    pull_number: {
        type: Number,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    owner:{
        type:String,
        required:true
    },
     status:{
        type:String,
        enum:["queued","processed","failed","pending"],
        default:"pending"
    },
   
}, { timestamps: true })

export const WebHookEvent = mongoose.model("WebHookEvent", webHookEventSchema)  
