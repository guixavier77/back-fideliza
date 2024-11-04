import { PrismaClient } from "@prisma/client";
import { validateAward, validateUpdateAward } from "../../validators/awards-validator";
import { AwardCreate, AwardUpdate } from "../models/awards";
import multer from 'multer';
import { cloudinary } from "../../upload/cloudinaryConfig";
import UploadService from "./upload.service";

const prisma = new PrismaClient();


const uploadService = new UploadService();

class AwardsService {


    async create(awardCreate: AwardCreate): Promise<any> { 
        if (awardCreate.image) {
            const imageUrl = await uploadService.upload(awardCreate.image, 'awards_images'); 
            awardCreate.image = imageUrl;
        }
        const validate = validateAward(awardCreate);
        if (validate.error) throw new Error(validate.error.details[0].message);
        const { awards: AwardDB } = prisma;
        await AwardDB.create({ data: { ...awardCreate } });
    }

    async update(awardUpdate: AwardUpdate): Promise<any> { 
        const validate = validateUpdateAward(awardUpdate);
        if (validate.error) throw new Error(validate.error.details[0].message);

        if (awardUpdate.image) {
            const imageUrl = await uploadService.upload(awardUpdate.image, 'awards_images'); 
            awardUpdate.image = imageUrl;
        }

        const { awards: AwardDB } = prisma;
        await AwardDB.update({ where: { id: awardUpdate.id }, data: { ...awardUpdate } });
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const { awards: AwardDB } = prisma;
        const awards = await AwardDB.findMany({ where: { storeId: storeId } });
        return awards;
    }
}

export default AwardsService;
