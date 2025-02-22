import { Request, Response } from "express";
import CustomerReportsService from "../services/customerReports.service";



const customerReportsService = new CustomerReportsService();

export default class ReportsController {

    async GetHistoryPromotionsCustomer(req: Request, res: Response): Promise<void> {
        const user = (req as any).user;

        try {
            const data = await customerReportsService.historyParticipationPromotions(user.id);
            res.status(200).send({ msg: 'History successfully', data });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
        
    }

    async GetHistoryPointsCustomer(req: Request, res: Response): Promise<void> {
        const user = (req as any).user;

        try {
            const data = await customerReportsService.historyRewardPoints(user.id);
            res.status(200).send({ msg: 'History successfully', data });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
        
    }
}