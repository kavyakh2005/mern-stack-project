const productModel = require("../model/product.model");
const {
  noContentResponse,
  errorResponse,
  deletedResponse,
} = require("../utility/response");
const { createUniqueName } = require("../utility/helper");
const fs = require("fs");

const product = {
  async create(req, res) {
    try {
      console.log(req.body ); 
      const image = req.files.thumbnail;
      // console.log(categoryImg);
      // if (!categoryImg) {
      //   return noContentResponse(res);
      // }

      const {
        name,
        slug,
        shortDescription,
        longDescription,
        originalPrice,
        dicountPercentage,
        finalPrice,
        categoryID,
        brandId,
        colorID,
      } = req.body;

      // if name and slug is not passed by the user to show error for that
      // if (
      //   !name ||
      //   !slug ||
      //   !shortDescription ||
      //   !longDescription ||
      //   !originalPrice ||
      //   !dicountPercentage ||
      //   !finalPrice ||
      //   !categoryID ||
      //   !brandId ||
      //   !colors
      // ) {
      //   return errorResponse(res, "All Fields is required");
      // }

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await productModel.findOne({ name: name });
      if (exitingItem) {
        return res
          .status(400)
          .json({ message: "categroy already there", success: false });
      }

      // create a unique name for image
      const thumbnail = createUniqueName(image.name);
      // console.log(thumbnail);

      const destination = "public/images/product/" + thumbnail;

      /*This is important code for saving image in database  */
      image.mv(destination, async (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "File Not Upload ", success: false });
        } else {
          const product = await productModel.create({
            name,
            slug,
            shortDescription,
            longDescription,
            originalPrice,
            dicountPercentage,
            finalPrice,
            categoryID,
            brandId,
            colors:JSON.parse(colorID),
            thumbnail,
          });
          await product.save();
          return res.status(201).json({
            message: "Product Create",
            success: true,
            timestamp: new Date().toISOString(),
            data: product,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async read(req, res) {
    try {
      const id = req.params.id;
      let product = null;
      if (id) {
        product = await productModel.findById(id);
      } else {
        product = await productModel.find();
      }

      if (!product) {
        return res.status(404).json({
          message: "Category Not Found ",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Category Found ",
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = product;
