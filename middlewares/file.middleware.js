// Import cloudinary library
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const cloudinary = require('cloudinary').v2;

// Coudinary config
cloudinary.config({ 
    cloud_name: 'urachiche103',
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cd(null, `${Date.now()}-${file.originalname}`);
    },
    destination : (req, file, cb) => {
        cd(null, path.join(__dirname, '../temp/uploads'))
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, res, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(new Error('Invalid file type'));
    } else {
        cd(null, true);
    }
};

const ulpload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const filePath = req.file.path;
            const image = await cloudinary.uploader.upload(filePath);
            await fs.unlinkSync(filePath);
            req.file_url = image.secure_url;
            next();
        } catch(error) {
            return console.log(error)
        }
    }
};

module.exports = {uploadToCloudinary};