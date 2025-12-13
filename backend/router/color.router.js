const colorRouter = require("express").Router();
const { create, read ,deletebyID , status , update} = require("../controller/color.controller");
const authMiddleware = require("../middleware/authmiddleware");
// const fileupload = require("express-fileupload");

colorRouter.post("/create", authMiddleware, create);
colorRouter.get("/:id?", read);
colorRouter.delete("/delete/:id", deletebyID);
colorRouter.patch("/status/:id", status);
colorRouter.put("/update/:id",  update);


module.exports = colorRouter;
