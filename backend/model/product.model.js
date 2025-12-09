const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      minLength: 1,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 250,
      minLength: 1,
    },
    longDescription: {
      type: String,
      required: true,
      minlength: 5,
    },
    originalPrice: {
      type: Number,
      required: true,
      default: 100,
    },
    dicountPercentage: {
      type: Number,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    categoryID: {
      //here we are referencing category model
      type: mongoose.Schema.ObjectId,
      ref: "Category" /* yeh naam wohi dena hoga jo category model mei diya h */,
    },
    brandID: {
      // here we are referencing brand model
      type: mongoose.Schema.ObjectId,
      ref: "Brand" /* yeh naam wohi dena hoga jo brand model mei diya h */,
    },
    colors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Color" /* yeh naam wohi dena hoga jo brand model mei diya h */,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    topSelling: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
