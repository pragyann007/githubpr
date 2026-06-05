import {Queue} from "bullmq"
import { redisConnection } from "../config/redis.js"

export const prQuee = new Queue("pr-quee",{
    connection:redisConnection,
    
    
})