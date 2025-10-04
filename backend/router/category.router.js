const categoryRouter = require("express").Router();
const { create, read ,deletebyID , status} = require("../controller/category.controller");
const fileupload = require("express-fileupload");

//using a fileupload middleware which will help us to upload the image in database
categoryRouter.post("/create", fileupload({ createParentPath: true }), create);
categoryRouter.get("/:id?", read);
categoryRouter.delete("/delete/:id", deletebyID);
categoryRouter.patch("/status/:id", status);


module.exports = categoryRouter;
