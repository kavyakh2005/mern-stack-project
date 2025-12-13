const adminRouter = require("express").Router();
const { login,logout } = require("../controller/admin.controller");

adminRouter.post("/login", login);
adminRouter.get("/logout", logout);




module.exports = adminRouter;