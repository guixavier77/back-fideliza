
import { validateStore} from "../../validators/stores-validator";
import { StoreCreate } from "../models/stores";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
class StoresService {

    async create(storeCreate: StoreCreate): Promise<any> { 
        const validate = validateStore(storeCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const {stores: StoresDB} = prisma;
        const store = await StoresDB.findFirst({where: {cnpj: storeCreate.cnpj}})
        if(store) throw new Error('CNPJ store already exists')
        await StoresDB.create({data: {...storeCreate}})
    }

    async getAll(): Promise<any> { 
        const {stores: StoresDB} = prisma;
        const stores = await StoresDB.findMany()
        return stores;
    }

}

export default StoresService;

