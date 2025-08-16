import express from "express";
import cors from "cors";    
import roomRouter from "./router/room.router.js";

const app=express();

app.use(express.json());
app.use(cors({
    origin:process.env.CORS_ORIGINE
}))

app.use("/api/v1",roomRouter)


export default app