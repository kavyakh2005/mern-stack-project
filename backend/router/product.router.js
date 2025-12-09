const productRouter = require("express").Router();
const fileupload = require("express-fileupload");
const {
  create,
  read,
  status,
  stock,
  topSelling,
  images,
} = require("../controller/product.controller");

productRouter.post("/create", fileupload({ createParentPath: true }), create);
productRouter.get("/:id?", read);
productRouter.patch("/status/:id", status);
productRouter.patch("/stock/:id", stock);
productRouter.patch("/topSelling/:id", topSelling);
productRouter.patch("/images/:id", fileupload({ createParentPath: true }), images);

module.exports = productRouter;
