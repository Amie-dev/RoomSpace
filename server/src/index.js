import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/db.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server start at  port ", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
