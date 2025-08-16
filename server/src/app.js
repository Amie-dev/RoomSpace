import express from "express";
import cors from "cors";    
import roomRouter from "./router/room.router.js";
import dataRouter from "./router/data.router.js";

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:process.env.CORS_ORIGINE
}))

app.use("/api/v1/room",roomRouter)
app.use("/api/v1/data",dataRouter)

export default app