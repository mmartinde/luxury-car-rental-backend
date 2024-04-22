// Import cloudinary library
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Coudinary config
cloudinary.config({
  cloud_name: "urachiche103",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../temp/uploads"));
  },
});

const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, res, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error("Invalid file type"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
      try {
        const filePath = req.file.path;
        const picture = await cloudinary.uploader.upload(filePath);
  
        // Asynchronously delete the file after uploading to Cloudinary
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete temporary file:", err);
            // Optional: You may choose to still allow the process to proceed even if file deletion fails
          }
        });
  
        req.file_url = picture.secure_url;
        next();
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ message: "Failed to upload image" });
      }
    } else {
      res.status(400).json({ message: "No file provided" });
    }
  };

module.exports = { uploadToCloudinary };
