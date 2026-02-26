import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinaryConfig.js';

export const fileValidation = {
    file: [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        "application/vnd.ms-word"
    ]
};

export const multerCloud = ({ fileTypes = fileValidation.file } = {}) => {
    
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'ieee-recruitment-cvs', 
            resource_type: "auto", 
        },
    });

    const upload = multer({ 
        storage, 
        limits: { fileSize: 10 * 1024 * 1024 } 
    });
    
    return upload;
};