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

const storage = multer.memoryStorage();

const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

//esto debe usarse como un middleware de la siguiente forma upload.single('picture')
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!VALID_FILE_TYPES.includes(file.mimetype)) {
            cb(new Error("Invalid file type"), false);
        } else {
            cb(null, true);
        }
    }
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            // Convert buffer to a string to simulate a file upload
            const uploadResponse = await cloudinary.uploader.upload_stream({
                resource_type: 'raw'
            }, (error, result) => {
                if (result) {
                    req.file_url = result.secure_url;
                    next();
                } else {
                    console.error("Cloudinary error:", error);
                    res.status(500).json({ message: "Failed to upload image to Cloudinary" });
                }
            });

            // Make sure to convert the buffer into a readable stream
            const bufferStream = new require('stream').Readable();
            bufferStream.push(req.file.buffer);
            bufferStream.push(null); // End of stream
            bufferStream.pipe(uploadResponse);

        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            res.status(500).json({ message: "Failed to upload image" });
        }
    } else {
        res.status(400).json({ message: "No file provided" });
    }
};

module.exports = { uploadToCloudinary, upload };
