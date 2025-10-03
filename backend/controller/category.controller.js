const categoryModel = require("../model/category.model");
const { noContentResponse, errorResponse } = require("../utility/response");
const { createUniqueName } = require("../utility/helper");

const category = {
  async create(req, res) {
    try {
      const categoryImg = req.files.image;
      // console.log(categoryImg);
      // if (!categoryImg) {
      //   return noContentResponse(res);
      // }

      // if name and slug is not passed by the user to show error for that
      const { name, slug } = req.body;
      if (!name || !slug) {
        return noContentResponse(res);
      }

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await categoryModel.findOne({ name: name });
      if (exitingItem) {
        return res
          .status(400)
          .json({ message: "categroy already there", success: false });
      }
      // create a unique name for image

      const image = createUniqueName(categoryImg.name);
      // console.log(image);

      const destination = "public/images/category/" + image;

      /*This is important code for saving image in database  */
      categoryImg.mv(destination, async (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "File Not Upload ", success: false });
        } else {
          const category = await categoryModel.create({
            name: name,
            slug: slug,
            image: categoryImg.name,
          });
          // await category.save();
          return res.status(201).json({
            message: "Category Create",
            success: true,
            timestamp: new Date().toISOString(),
            data: category,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async read(req, res) {
    try {
      const id = req.params.id;
      let category = null;
      if (id) {
        category = await categoryModel.findById(id);
      } else {
        category = await categoryModel.find();
      }

      if (!category) {
        return res.status(404).json({
          message: "Category Not Found ",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Category Found ",
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = category;
