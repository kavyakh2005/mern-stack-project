const colorModel = require("../model/color.model");
const {
  noContentResponse,
  errorResponse,
  deletedResponse,
} = require("../utility/response");
const { createUniqueName } = require("../utility/helper");
const fs = require("fs");

const color = {
  async create(req, res) {
    try {
      // if name and slug is not passed by the user to show error for that
      const { name, slug, hexcode } = req.body;
      if (!name || !slug || !hexcode) {
        return noContentResponse(res);
      }

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await colorModel.findOne({ name: name });
      if (exitingItem) {
        return res
          .status(400)
          .json({ message: "color already there", success: false });
      }
      const color = await colorModel.create({
        name: name,
        slug: slug,
        hexcode: hexcode,
      });

      await color.save();
      return res.status(201).json({
        message: "color Create",
        success: true,
        timestamp: new Date().toISOString(),
        data: color,
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
      let color = null;
      if (id) {
        color = await colorModel.findById(id);
      } else {
        color = await colorModel.find();
      }

      if (!color) {
        return res.status(404).json({
          message: "color Not Found ",
          success: false,
        });
      }

      return res.status(200).json({
        message: "color Found ",
        success: true,
        data: color,
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
      const exitingCat = await colorModel.findByIdAndDelete(id);
      // console.log(exitingCat);
      await colorModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Color Deleted ",
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
      const color = await colorModel.findById(id);

      await colorModel.findByIdAndUpdate(id, { status: !color.status });
      return res.status(200).json({
        message: "color Status Updated ",
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


      // if name and slug is not passed by the user to show error for that
      const { name, slug, hexcode } = req.body;

      

      // if data is already there and user is trying to create again to show error for that
      const exitingItem = await colorModel.findById(id);
      if (!exitingItem) {
        return res
          .status(400)
          .json({ message: "Color not Found", success: false });
      }

      const update = {};
      if (name) update.name = name;
      if (slug) update.slug = slug;
      if (hexcode) update.hexcode = hexcode;

      

      const color = await colorModel.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );
      // await category.save();
      return res.status(200).json({
        message: "Color updated successfully",
        success: true,
        timestamp: new Date().toISOString(),
        data: color,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = color;
