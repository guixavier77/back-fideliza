
import { validateAward } from "../../validators/awards-validator";
import { validateStore} from "../../validators/stores-validator";
import { AwardCreate } from "../models/awards";
import { StoreCreate } from "../models/stores";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
class AwardsService {

    async create(awardCreate: AwardCreate, storeId: number): Promise<any> { 
        const validate = validateAward(awardCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {awards: AwardDB} = prisma;
        await AwardDB.create({data: {storeId: storeId,...awardCreate}})
    }

    async getAll(): Promise<any> { 
        const {stores: StoresDB} = prisma;
        const stores = await StoresDB.findMany()
        return stores;
    }

    async getAllByStore(storeId: number): Promise<any> { 
        const {awards: AwardDB} = prisma;
        const award = await AwardDB.findMany({where: {storeId: storeId}})
        return award;
    }

}

export default AwardsService;

