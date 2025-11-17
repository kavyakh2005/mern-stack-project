const productRouter = require("express").Router();
const { create, read} = require("../controller/product.controller");
const fileupload = require("express-fileupload");

//using a fileupload middleware which will help us to upload the image in database
productRouter.post("/create", fileupload({ createParentPath: true }), create);
productRouter.get("/:id?",read);



module.exports = productRouter;
