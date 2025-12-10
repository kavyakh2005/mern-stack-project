// const mongoose = require("mongoose");
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"], // Allowed values only
      default: "admin",              // Default role
    },
  },
  { timestamps: true }
);

// const AdminPanel =  mongoose.model("admins", AdminSchema);

// export default AdminPanel;
module.exports = mongoose.model("admins", AdminSchema);
