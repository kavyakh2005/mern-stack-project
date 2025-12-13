  const adminModel = require("../model/admin.model");
  const fs = require("fs");
  const jwt = require("jsonwebtoken");
  const { errorResponse, successResponse } = require("../utility/response");

  const admin = {
    async login(req, res) {
      try {
        const { email, password } = req.body;
        const adminData = await adminModel.findOne({ email });

        if (!adminData) return errorResponse(res, "Admin not Found");

        if (password !== adminData.password)
          return errorResponse(res, "Incorrect Password");

        // 1. Create payload
        const payload = {
          id: adminData._id,
          role: adminData.role,
          email: adminData.email,
        };

        // ----------------------------
        // 🔥 Create Access + Refresh Token
        // ----------------------------

        //   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        //     expiresIn: "15m",
        //   });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });

        // ----------------------------
        // 🔐 Store refresh token in HTTP-only cookie
        // ----------------------------
        res.cookie("admin_token", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          path:"/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // ----------------------------
        // 🎯 Send Access Token back to frontend
        // ----------------------------
        return res.json({
          message: "Admin Login Successful",
          success: true,
          refreshToken,
          admin: {
            id: adminData._id,
            name: adminData.name,
            email: adminData.email,
          },
        });
      } catch (error) {
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
    },

    async logout(req, res) {
      try {
        // res.clearCookie("admin_token", {
        //   httpOnly: true,
        //   secure: false, // Set to false only in development if not using HTTPS
        //   sameSite: "strict",
        //   path: "/", // ⭐ must match exactly
        //   // domain: "localhost",
        // });

        res.clearCookie("admin_token", {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          path: "/",  
        });

        return res
          .status(200)
          .json({ message: "Logged out successfully", success: true });
      } catch (error) {
        console.log(error);
        return errorResponse(res, error.message || "Internal server error");
      }
    },
  };

  module.exports = admin;
