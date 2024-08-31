import { Request,Response } from "express";
import UsersService from "../services/users.service";
import SendEmailService from "../services/sendEmail.service";

const usersService = new UsersService();
const sendEmailService = new SendEmailService();
export default class UsersController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await usersService.createUser(req.body);
            console.log(user);
            await sendEmailService.confirmRegister(user.email)
            res.status(200).send({ msg: 'User created successfull', user });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await usersService.update(req.body);
            res.status(200).send({ msg: 'User updated successfull', user });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await usersService.getAll();
            res.status(200).send({ msg: 'Get users successfull', users });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });

        }
    }

    async auth(req: Request, res: Response): Promise<void> {
        try{
            const {user, token} = await usersService.auth(req.body);
            res.status(200).send({msg: 'Login success', user, token}) 
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });

        }
    }
}