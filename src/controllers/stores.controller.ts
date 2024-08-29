import { Request,Response } from "express";
import UsersService from "../services/users.service";
import StoresService from "../services/stores.service";

const storesService = new StoresService();
export default class StoresController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const store = await storesService.create(req.body);
            res.status(200).send({ msg: 'Store created sucessfull', store });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stores = await storesService.getAll();
            res.status(200).send({  stores });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getOne(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const store = await storesService.getOne(parseInt(storeId));
            res.status(200).send({  store });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}