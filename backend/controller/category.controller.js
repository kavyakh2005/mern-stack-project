const categoryModel = require("../model/category.model");
const { noContentResponse } = require("../utility/response");

const category = {
  async create(req, res) {
    try {
      if (!req.body.name || !req.body.slug) {
        return noContentResponse(res);
      }

      const exitingItem = await categoryModel.findOne({ name: req.body.name });
      if (exitingItem) {
        return res
          .status(500)
          .json({ message: "categroy already created", succes: false });
      }

      const category = await categoryModel.create({
        name: req.body.name,
        slug: req.body.slug,
      });

      await category.save();
      res.status(201).json({
        message: "Category Create",
        succes: true,
        timestamp: new Date().toISOString(),
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        succes: false,
      });
    }
  },
};

module.exports = category;
