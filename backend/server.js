import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
import cors from "cors"



dotenv.config()

const app = express()

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
connectDb()
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authRouter);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

