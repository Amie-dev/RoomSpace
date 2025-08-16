import { Router } from "express";
import { getDataFiels, setDataFiles } from "../controller/data.controller.js";

const dataRouter=Router()


dataRouter.post("/set-data/:uniqueId",setDataFiles)
dataRouter.get("/:uniqueId/get-data",getDataFiels)

export default dataRouter