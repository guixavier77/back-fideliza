import { Request, Response } from "express";
import PromotionsService from "../services/promotions.service";


const promotionsService = new PromotionsService();

export default class PromotionsController {

    async create(req: Request, res: Response): Promise<void> {   
        try {
            const promotion = await promotionsService.create(req.body);
            res.status(200).send({ msg: 'Promotion created sucessfull', promotion });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAllByStore(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const promotions = await promotionsService.getAllByStore(parseInt(storeId));
            res.status(200).send({promotions});
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}