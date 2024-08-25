import { validateUsers } from "../../validators";
import { UserCreate } from "../models/users";

class UsersService {
    async createUser(userCreate: UserCreate): Promise<any> { 
        const validate = validateUsers(userCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        

    }

    async getAll(): Promise<any> {
        
        return [];
    }

    async getOne(): Promise<any> {}

}

export default UsersService;

