import { Request, Response } from "express";
import AwardsService from "../services/awards.service";


const awardsService = new AwardsService();
export default class AwardsController {

    async create(req: Request, res: Response): Promise<void> {
      
        try {
            const award = await awardsService.create(req.body);
            res.status(200).send({ msg: 'Award created sucessfull', award });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAllByStore(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const awards = await awardsService.getAllByStore(parseInt(storeId));
            res.status(200).send({awards});
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}