import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/db.js";
import app from "./app.js";
import Newroom from "./model/roomAndData.model.js";

dotenv.config();

const port = process.env.PORT || 4000;

connectDB()
  .then(async() => {
    await Newroom.syncIndexes();
    console.log("✅ Indexes synced for Newroom collection");
    app.listen(port, () => {
      console.log("Server start at  port ", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
