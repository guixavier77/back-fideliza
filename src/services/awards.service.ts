
import { PrismaClient } from "@prisma/client";
import { validateAward, validateUpdateAward } from "../../validators/awards-validator";
import { AwardCreate, AwardUpdate } from "../models/awards";
import multer from 'multer'


const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });
class AwardsService {

    async create(awardCreate: AwardCreate): Promise<any> { 
        const validate = validateAward(awardCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {awards: AwardDB} = prisma;
        await AwardDB.create({data: {...awardCreate}})

    }

    async update(awardUpdate: AwardUpdate): Promise<any> { 
        const validate = validateUpdateAward(awardUpdate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {awards: AwardDB} = prisma;
        await AwardDB.update({ where: {id: awardUpdate.id}, data: {...awardUpdate}})
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const {awards: AwardDB} = prisma;
        const award = await AwardDB.findMany({where: {storeId: storeId}})
        return award;
    }

}

export default AwardsService;

