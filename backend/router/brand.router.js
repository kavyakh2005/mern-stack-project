const brandRouter = require("express").Router();
const { create, read ,deletebyID , status , update} = require("../controller/brand.controller");
const fileupload = require("express-fileupload");

//using a fileupload middleware which will help us to upload the image in database
brandRouter.post("/create", fileupload({ createParentPath: true }), create);
brandRouter.get("/:id?", read);
brandRouter.delete("/delete/:id", deletebyID);
brandRouter.patch("/status/:id", status);
brandRouter.put("/update/:id", fileupload({ createParentPath: true }), update);


module.exports = brandRouter;
