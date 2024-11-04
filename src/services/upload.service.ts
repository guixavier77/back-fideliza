import { PrismaClient } from "@prisma/client";
import { validateAward, validateUpdateAward } from "../../validators/awards-validator";
import { AwardCreate, AwardUpdate } from "../models/awards";
import multer from 'multer';
import { cloudinary } from "../../upload/cloudinaryConfig";

const prisma = new PrismaClient();



class UploadService {

    async upload(file: string, folderName: string): Promise<string | undefined> {
        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file, {
                    folder: folderName,
                    resource_type: 'auto'
                });
                return result.secure_url;
                
            } catch (error) {
                throw new Error(`Failed to upload image: ${error.message}`);
            }
        }
        return undefined;
    }
    
}

export default UploadService;
