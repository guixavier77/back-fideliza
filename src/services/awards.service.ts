
import { PrismaClient } from "@prisma/client";
import { validateAward } from "../../validators/awards-validator";
import { AwardCreate } from "../models/awards";
import multer from 'multer'


const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });
class AwardsService {

    async create(awardCreate: AwardCreate): Promise<any> { 
        const validate = validateAward(awardCreate)
        console.log(validate);
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {awards: AwardDB} = prisma;
        await AwardDB.create({data: {...awardCreate}})
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const {awards: AwardDB} = prisma;
        const award = await AwardDB.findMany({where: {storeId: storeId}})
        return award;
    }

}

export default AwardsService;

