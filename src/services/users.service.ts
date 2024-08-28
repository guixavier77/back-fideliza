import { PrismaClient } from "@prisma/client";
import { validateUser } from "../../validators/users-validator";
import { UserAuth, UserCreate } from "../models/users";
import {  comparePassword, generatePassword } from "../../utils/password";
import jwt from 'jsonwebtoken'

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
        const user = await UsersDB.create({
            data: {
                ...userCreate,
                password,
            }
        })

        return user;
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

    async auth(userAuth: UserAuth): Promise<any>{
        const {users: UsersDB} = this.prisma;
        const {email, password} = userAuth;

        const userExists = await UsersDB.findFirst({where: {email: email}})

        if(!userExists && !userExists.active) throw new Error('User not found');

        if(!comparePassword(password, userExists.password)) throw new Error('Password invalid');

        const payload = {
            id: userExists.id,
            email: userExists.email,
            name: userExists.name,
            role: userExists.role,
            storeId: userExists.storeId,
            active: userExists.active
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '30d'
        })

        return {token, user: payload};
    }

}

export default UsersService;

