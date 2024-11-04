import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const createStorage = (folderName: string) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => ({
            folder: folderName,
            format: 'png',
            public_id: file.originalname.split('.')[0],
        }),
    });
};

export { createStorage, cloudinary };
