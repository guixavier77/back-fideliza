import { Request,Response } from "express";
import UsersService from "../services/users.service";

export default class UsersController {
    private usersService = new UsersService();


    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.usersService.createUser(req.body);
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
            res.status(500).send({ msg: 'Erro ao buscar usuários', error });
        }
    }
}