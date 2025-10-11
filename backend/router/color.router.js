const colorRouter = require("express").Router();
const { create, read ,deletebyID , status , update} = require("../controller/color.controller");
// const fileupload = require("express-fileupload");

colorRouter.post("/create",  create);
colorRouter.get("/:id?", read);
colorRouter.delete("/delete/:id", deletebyID);
colorRouter.patch("/status/:id", status);
colorRouter.put("/update/:id",  update);


module.exports = colorRouter;
