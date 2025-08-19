import { Router } from "express";
import { getDataFiels, setDataFiles } from "../controller/data.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const dataRouter=Router()


dataRouter.post("/set-data/:uniqueId",upload.single("file")  ,setDataFiles)
dataRouter.get("/:uniqueId/get-data",getDataFiels)

export default dataRouter