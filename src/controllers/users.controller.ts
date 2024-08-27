import { Request,Response } from "express";
import UsersService from "../services/users.service";
import SendEmailService from "../services/sendEmail.service";

export default class UsersController {
    private usersService = new UsersService();


    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.usersService.createUser(req.body);
            console.log(user);
            await new SendEmailService().confirmRegister(user.email)
            res.status(200).send({ msg: 'DEU BÃO', user });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }


    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.usersService.getAll();
            res.status(200).send({ msg: 'DEU BÃO', users });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });

        }
    }


    async auth(req: Request, res: Response): Promise<void> {
        try{
            const token = await this.usersService.auth(req.body);
            res.status(200).send({msg: 'Login success', token})
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });

        }
    }
}