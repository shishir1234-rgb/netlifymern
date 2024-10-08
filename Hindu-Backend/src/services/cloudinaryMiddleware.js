const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').configDotenv();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // params: {
    //     folder: 'company_images', // Optional: specify the folder in Cloudinary
    //     allowed_formats: ['jpg', 'png', 'jpeg', 'mp4'],
    //     resource_type: 'auto', // Automatically detect the file type (image or video)
    // },
    params: async (req, file) => {
        let folder = 'general_uploads';
        if (file.fieldname === 'logo') {
            folder = 'company_logos';
        } else if (file.fieldname === 'images') {
            folder = 'company_images';
        }

        return {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'jpeg', 'mp4'],
            resource_type: 'auto',
            public_id: `${Date.now()}-${file.originalname}`
        };
    }
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });


module.exports = upload;
