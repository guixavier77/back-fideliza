import { PrismaClient } from "@prisma/client";
import { validateUser } from "../../validators/users-validator";
import { UserCreate } from "../models/users";
import { generatePassword } from "../../utils/password";

class UsersService {
    private prisma = new PrismaClient();

    async createUser(userCreate: UserCreate): Promise<any> { 
        const {users: UsersDB} = this.prisma;
        const validate = validateUser(userCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const userExists = await UsersDB.findFirst({
            where: {
                OR: [
                    {cpf: userCreate.cpf},
                    {email: userCreate.email}
                ]
            }
        })

        if(userExists){
            if(userExists.cpf === userCreate.cpf) throw new Error('CPF already exists');
            else throw new Error('E-mail already exists');
        }
        const password = await generatePassword(userCreate.password);
        await UsersDB.create({
            data: {
                ...userCreate,
                password,
            }
        })
    }

    async getAll(): Promise<any> { 
        const {users: UsersDB} = this.prisma;
        const users = await UsersDB.findMany({
            select: {
                id: true,
                cpf: true,
                email: true,
                name: true,
                phone: true,
                sex: true,
                active: true,
                role: true,
                storeId: true,
                created_at: true,
                updated_at: true,
                password: false,
            }
        })
        return users;
    }

    async getOne(): Promise<any> {}

}

export default UsersService;

