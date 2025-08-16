import Data from "../model/data.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const setDataFiles=asyncHandler(async(req,res)=>{
    const {content}=req.body
    //do remining part
    const data=await Data.create({
        content
    })
    res.json(new ApiResponse(201,data,"Data updated"))
})