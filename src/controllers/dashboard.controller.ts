import { Request, Response } from "express";
import DashboardService from "../services/dashboard.service";
import OperatorsReportsService from "../services/operatorReports.service";



const dashboardService = new DashboardService();
const operatorsReportsService = new OperatorsReportsService();

export default class DashboardController {

    async getResults(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;

        try {
            const data = await dashboardService.getAll(Number(storeId));
            res.status(200).send({ msg: 'History successfully', data });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
        
    }
}