const productModel = require("../model/product.model");
const colorModel = require("../model/color.model");
const brandModel = require("../model/brand.model");
const {
  noContentResponse,
  errorResponse,
  deletedResponse,
  updatedResponse,
  serverErrorResponse,
} = require("../utility/response");
const { createUniqueName } = require("../utility/helper");
const fs = require("fs");
const categoryModel = require("../model/category.model");

const product = {
  async create(req, res) {
    try {
      // console.log(req.body );
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
        discountPercentage,
        finalPrice,
        categoryID,
        brandID,
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
            discountPercentage,
            finalPrice,
            categoryID,
            brandID,
            colors: JSON.parse(colorID),
            thumbnail,
            stock: true,
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
      const { categorySlug, colorSlug, brandSlug } = req.query;
      const filterQuery = {};
      const id = req.params.id;
      let product = null;

      if (categorySlug) {
        const category = await categoryModel.findOne({ slug: categorySlug });

        if (!category) {
          return res.status(404).json({
            success: false,
            message: `Category not found for slug: ${categorySlug}`,
          });
        }
        filterQuery.categoryID = category._id;
      }

      if (colorSlug) {
        const color = await colorModel.findOne({ slug: colorSlug });
        filterQuery.colors = color._id;
        // console.log(color)
      }

      if (brandSlug) {
        const brand = await brandModel.findOne({ slug: brandSlug });
        filterQuery.brandID = brand._id;
      }

      // console.log(filterQuery)

      if (id) {
        product = await productModel.findById(id);
      } else {
        product = await productModel
          .find(filterQuery)
          .populate("categoryID")
          .populate("brandID")
          .populate("colors");
      }

      if (!product) {
        return res.status(404).json({
          message: "Category Not Found ",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Product Found ",
        success: true,
        data: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async status(req, res) {
    try {
      const id = req.params.id;
      const product = await productModel.findById(id);

      await productModel.findByIdAndUpdate(id, { status: !product.status });
      return res.status(200).json({
        message: "product Status Updated ",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async stock(req, res) {
    try {
      const id = req.params.id;
      const product = await productModel.findById(id);

      await productModel.findByIdAndUpdate(
        id,
        { stock: !product.stock },
        { new: true }
      );
      return res.status(200).json({
        message: "product Status Updated ",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async topSelling(req, res) {
    try {
      const id = req.params.id;
      const product = await productModel.findById(id);

      await productModel.findByIdAndUpdate(
        id,
        { topSelling: !product.topSelling },
        { new: false }
      );
      return res.status(200).json({
        message: "Product Top Selling Status Updated ",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async images(req, res) {
    try {
      const images = req.files.images;
      const id = req.params.id;
      const exitingProduct = await productModel.findById(id);
      const imageArray = exitingProduct.images || [];
      const allPromise = [];
      images.map((img) => {
        const image = createUniqueName(img.name);
        const destination = "public/images/product/" + image;
        imageArray.push(image);
        allPromise.push(img.mv(destination));
      });

      await Promise.all(allPromise);
      await productModel.findByIdAndUpdate(id, {
        $set: { images: imageArray },
      });
      // return updatedResponse(res, "Product images updated successfully", imageArray);
      return res.status(201).json({
        message: "Product Create",
        success: true,
        timestamp: new Date().toISOString(),
        data: imageArray,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = product;
