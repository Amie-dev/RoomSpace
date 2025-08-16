import { Router } from "express";
import { setDataFiles } from "../controller/data.controller.js";

const dataRouter=Router()


dataRouter.post("/set-data",setDataFiles)

export default dataRouter