import { Request,Response } from "express";
import UsersService from "../services/users.service";
import StoresService from "../services/stores.service";
import AwardsService from "../services/awards.service";
import jwtDecode from 'jsonwebtoken'


export default class AwardsController {
    private awardsService = new AwardsService();

    async create(req: Request, res: Response): Promise<void> {
        const {user} = req as any;
        console.log(user);
        
        try {
            const store = await this.awardsService.create(req.body, user.storeId);
            res.status(200).send({ msg: 'Award created sucessfull', store });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stores = await this.awardsService.getAll();
            res.status(200).send({  stores });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAllByStore(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const awards = await this.awardsService.getAllByStore(parseInt(storeId));
            res.status(200).send({awards});
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}