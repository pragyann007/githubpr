import { Octokit } from "@octokit/rest";
import { gitHubApp } from "../server.js";


export const registerWebhooks = async ()=>{
    gitHubApp.webhooks.on("pull_request.opened",async({octokit,payload})=>{
        console.log("Pull request opened event received with payload:", payload);
        const {pull_request:pr,repository,installation} = payload;
    
        const owner = repository.owner.login;
        const repo = repository.name;
        const pull_number = pr.number;
    
    
    
        const {data:diff} = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}",{
            owner,
            repo,
            pull_number,
            mediaType:{
                format:"diff"
            }
        })
    
        const {data:files} = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files",{
            owner,
            repo,
            pull_number,
        })
    
        const {data:commits} = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",{
            owner,
            repo,
            pull_number,
        })
    
        console.log("Pull request opened:", {
            diff,
            files,
            commits
        })
    
    })
}