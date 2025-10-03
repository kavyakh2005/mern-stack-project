const categoryRouter = require("express").Router();
const { create, read } = require("../controller/category.controller");
const fileupload = require("express-fileupload");

categoryRouter.post("/create",create);
//using a fileupload middleware which will help us to upload the image in database
categoryRouter.get("/:id?", read);

module.exports = categoryRouter;
