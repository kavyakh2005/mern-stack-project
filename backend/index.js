require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working

const express = require("express");
const mongoose = require("mongoose");
const server = express();
server.use(express.json());

const cors = require('cors')
server.use(cors({origin:"http://localhost:3000"}))

// const fileUpload = require("express-fileupload");
// server.use(fileUpload({ createParentPath: true }));

const categoryRouter = require('../backend/router/category.router')
server.use('/category',categoryRouter)

const colorRouter = require('../backend/router/color.router')
server.use('/color',colorRouter)

const brandRouter = require('../backend/router/brand.router')
server.use('/brand',brandRouter)

const productRouter = require('../backend/router/product.router')
server.use('/product',productRouter)

server.use(express.static('./public'))


// server.listen(process.env.PORT  , () => {
//   console.log("Server Running at Port NUmber " + process.env.PORT);
//   mongoose
//     .connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME })
//     .then(() => {
//       console.log("DataBase Connected");
//       server.listen(process.env.PORT , ()=>{
//         console.log("Server Running at Port Number" + process.env.PORT)
//       })
//     })
//     .catch(() => {
//       console.log("unable to connect database");
//     });
// });


mongoose
  .connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT, () => {
      console.log("Server Running:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed", err);
  });
