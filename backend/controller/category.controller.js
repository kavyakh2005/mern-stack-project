const categoryModel = require("../model/category.model");
const {
  noContentResponse,
  errorResponse,
  deletedResponse,
} = require("../utility/response");
const { createUniqueName } = require("../utility/helper");
const fs = require("fs");

const category = {
  async create(req, res) {
    try {
      const categoryImg = req.files.image;
      console.log(categoryImg , "Image");
      // if (!categoryImg) {
        // return noContentResponse(res);
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
            image: image,
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

  async deletebyID(req, res) {
    try {
      const id = req.params.id;
      const exitingCat = await categoryModel.findByIdAndDelete(id);
      // console.log(exitingCat);
      if (exitingCat) {
        fs.unlinkSync(`public/images/category/${exitingCat.image}`);
      }
      await categoryModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Category Deleted ",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async status(req, res) {
    try {
      const id = req.params.id;
      const category = await categoryModel.findById(id);

      await categoryModel.findByIdAndUpdate(id, { status: !category.status });
      return res.status(200).json({
        message: "Category Status Updated ",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      // console.log(id);
      // return;
      const categoryImg = req.files.image || null
      // console.log(categoryImg);
      // if (!categoryImg) {
      //   return noContentResponse(res);
      // }

      // if name and slug is not passed by the user to show error for that
      const { name, slug } = req.body;

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await categoryModel.findById(id );
      if (!exitingItem) {
        return res
          .status(400)
          .json({ message: "categroy not Found", success: false });
      }

      const update = {};
      if (name) update.name = name;
      if (slug) update.slug = slug;

      if (categoryImg) {
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
            fs.unlinkSync(`public/images/category/${exitingItem.image}`);
            // console.log(update);
            update.image = image;
            const category = await categoryModel.findByIdAndUpdate(id, { $set : update }, { new: true });
            // await category.save();
            return res.status(201).json({
              message: "Category updated successfully",
              success: true,
              timestamp: new Date().toISOString(),
              data: category,
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = category;
