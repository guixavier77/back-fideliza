
import { PrismaClient } from "@prisma/client";
import multer from 'multer';
import { validatePromotion } from "../../validators/promotions-validator";
import { PromotionCreate } from "../models/promotions";


const prisma = new PrismaClient();

class PromotionsService {

    async create(promotionCreate: PromotionCreate): Promise<any> { 
        const validate = validatePromotion(promotionCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {promotions: PromotionDB} = prisma;
        await PromotionDB.create({data: {...promotionCreate}})
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const {promotions: PromotionDB} = prisma;
        const promotions = await PromotionDB.findMany({where: {storeId: storeId}})
        return promotions;
    }

}

export default PromotionsService;

