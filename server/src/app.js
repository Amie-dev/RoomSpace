import express from "express";
import cors from "cors";    
import dotenv from "dotenv"
import roomRouter from "./router/room.router.js";
import dataRouter from "./router/data.router.js";

const app=express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:process.env.CORS_ORIGINE,
    credentials:true
}))

app.use("/api/v1/room",roomRouter)
app.use("/api/v1/data",dataRouter)

export default app