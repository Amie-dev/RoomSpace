import { Router } from "express";
import { createRoom, getRoom } from "../controller/room.controller.js";


const roomRouter=Router();

roomRouter.route("/create-room").post(createRoom)
roomRouter.get("/",getRoom)


export default roomRouter