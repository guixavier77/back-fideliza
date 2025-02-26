
import { PrismaClient } from "@prisma/client";
import { validatePromotion, validateUpdatePromotion } from "../../validators/promotions-validator";
import { PromotionCreate, PromotionUpdate } from "../models/promotions";


const prisma = new PrismaClient();

class PromotionsService {

    async create(promotionCreate: PromotionCreate): Promise<any> { 
        const validate = validatePromotion(promotionCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        console.log(validate);

        const {promotions: PromotionDB} = prisma;
        await PromotionDB.create({data: {...promotionCreate}})
    }

    async update(promotionUpdate: PromotionUpdate): Promise<any> { 
        const validate = validateUpdatePromotion(promotionUpdate)
        console.log(validate);
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {promotions: PromotionDB} = prisma;
        await PromotionDB.update({ 
            where:{id: promotionUpdate.id}, 
            data: {...promotionUpdate}}
        )
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const {promotions: PromotionDB} = prisma;
        const promotions = await PromotionDB.findMany({where: {storeId: storeId, active: true}})
        return promotions;
    }

}

export default PromotionsService;

