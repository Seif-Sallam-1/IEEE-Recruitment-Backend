const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig');

const fileValidation = {
    file:["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-word"]
};

const multerCloud = ({ fileTypes = fileValidation.file } = {}) => {
    
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'ieee-recruitment-cvs', 
            allowed_formats: fileTypes, 
         },
    });

    const upload = multer({ 
        storage, 
        limits: { fileSize: 1024 * 1024 * 10 } 
    });
    
    return upload;
};

module.exports = { fileValidation, multerCloud };