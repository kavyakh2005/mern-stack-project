const adminRouter = require("express").Router();
const { login } = require("../controller/admin.controller");
const fileupload = require("express-fileupload");

//using a fileupload middleware which will help us to upload the image in database
adminRouter.post("/login", fileupload({ createParentPath: true }), login);



module.exports = adminRouter;