import { Request,Response } from "express";
import UsersService from "../services/users.service";
import StoresService from "../services/stores.service";

export default class StoresController {
    private storesService = new StoresService();

    async create(req: Request, res: Response): Promise<void> {
        try {
            const store = await this.storesService.create(req.body);
            res.status(200).send({ msg: 'Store created sucessfull', store });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stores = await this.storesService.getAll();
            res.status(200).send({  stores });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getOne(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const store = await this.storesService.getOne(parseInt(storeId));
            res.status(200).send({  store });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}