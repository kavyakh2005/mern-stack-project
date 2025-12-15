const brandModel = require("../model/brand.model");
const productModel = require("../model/product.model");
const {
  noContentResponse,
  errorResponse,
  deletedResponse,
} = require("../utility/response");
const { createUniqueName } = require("../utility/helper");
const fs = require("fs");

const brand = {
  async create(req, res) {
    try {
      const brandImg = req.files.image;
      // console.log(brandImg);
      // if (!brandImg) {
      //   return noContentResponse(res);
      // }

      // if name and slug is not passed by the user to show error for that
      const { name, slug } = req.body;
      if (!name || !slug) {
        return noContentResponse(res);
      }

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await brandModel.findOne({ name: name });
      if (exitingItem) {
        return res
          .status(400)
          .json({ message: "brand already there", success: false });
      }
      // create a unique name for image

      const image = createUniqueName(brandImg.name);
      // console.log(image);

      const destination = "public/images/brand/" + image;

      /*This is important code for saving image in database  */
      brandImg.mv(destination, async (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "File Not Upload ", success: false });
        } else {
          const brand = await brandModel.create({
            name: name,
            slug: slug,
            image: image,
          });
          await brand.save();
          return res.status(201).json({
            message: "Brand Created",
            success: true,
            timestamp: new Date().toISOString(),
            data: brand,
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
      // let brand = null;
      if (id) {
        const brand = await brandModel.findById(id);
        return successResponse(res, "category Found", data);
      } else {
        const brand = await brandModel.find();

        const data = await Promise.all(
          brand.map(async (br) => {
            const productCount = await productModel.countDocuments({
              brandID: br._id,
            });
            return { ...br.toObject(), productCount };
          })
        );
        return res.status(200).json({
          message: "brand Found ",
          success: true,
          data: data,
        });
      }
      
      if (!brand) {
        return res.status(404).json({
          message: "Brand Not Found ",
          success: false,
        });
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  async deletebyID(req, res) {
    try {
      const id = req.params.id;
      const exitingBrand = await brandModel.findByIdAndDelete(id);
      // console.log(exitingBrand);
      if (exitingBrand) {
        fs.unlinkSync(`public/images/brand/${exitingBrand.image}`);
      }
      await brandModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Brand Deleted ",
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
      const brand = await brandModel.findById(id);

      await brandModel.findByIdAndUpdate(id, { status: !brand.status });
      return res.status(200).json({
        message: "Brand Status Updated ",
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
      const brandImg = req.files?.image || null;
      // console.log(brandImg);
      // if (!brandImg) {
      //   return noContentResponse(res);
      // }

      // if name and slug is not passed by the user to show error for that
      const { name, slug } = req.body;

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await brandModel.findById(id);
      if (!exitingItem) {
        return res
          .status(400)
          .json({ message: "brand not Found", success: false });
      }

      const update = {};
      if (name) update.name = name;
      if (slug) update.slug = slug;

      if (brandImg) {
        // create a unique name for image
        const image = createUniqueName(brandImg.name);
        // console.log(image);
        const destination = "public/images/brand/" + image;

        /*This is important code for saving image in database  */
        brandImg.mv(destination, async (error) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "File Not Upload ", success: false });
          } else {
            fs.unlinkSync(`public/images/brand/${exitingItem.image}`);
            // console.log(update);
            update.image = image;
            const brand = await brandModel.findByIdAndUpdate(
              id,
              { $set: update },
              { new: true }
            );
            await brand.save();
            return res.status(201).json({
              message: "Brand updated successfully",
              success: true,
              timestamp: new Date().toISOString(),
              data: brand,
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

module.exports = brand;
