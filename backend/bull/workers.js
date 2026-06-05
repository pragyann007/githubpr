import {Worker} from "bullmq"
import { redisConnection } from "../config/redis.js"
import { prQuee } from "./quee.js"
import { gitHubApp } from "../server.js";

export const worker = new Worker("pr-quee",async(job)=>{
    console.log("Processing job with id:",job.id);
    console.log("Job data:",job.data);

    const {installationId,repoName,pull_number,action,owner} = job.data;

    const octoToken = await gitHubApp.getInstallationOctokit(installationId);

    const {data:files} = await octoToken.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files",{
        owner,
        repo:repoName,
        pull_number,
    })

    const diff = files.map(file=>file.patch).join("\n");

    await sendtoAI(diff);

    console.log("Diff for PR #"+pull_number, diff);



},
{
    connection:redisConnection,
    concurrency:5,
   
}
)