const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require('cors')
server.use(express.json());
server.use(cors({origin:"http://localhost:3000"}))

const categoryRouter = require('../backend/router/category.router')
server.use('/category',categoryRouter)

server.listen(5000, () => {
  console.log("Server Running at Port NUmber 5000");
  mongoose
    .connect("mongodb://localhost:27017/", { dbName: "ishop" })
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch(() => {
      console.log("unable to connect database");
    });
});