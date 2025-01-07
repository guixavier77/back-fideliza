import { Request, Response } from "express";
import AwardsService from "../services/awards.service";
import LauncherPointsService from "../services/launcherPoints.service";



const launcherPointsService = new LauncherPointsService();

export default class LauncherPointsController {

    async launcherByCpf(req: Request, res: Response): Promise<void> {
        try {
            await launcherPointsService.sendPointsPerCpf(req.body);
            res.status(200).send({ msg: 'Launcher points successfully' });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async launcherByQrCode(req: Request, res: Response): Promise<void> {
        const {qrCode} = req.params;
        const user = (req as any).user;
        try {
            await launcherPointsService.sendPointsPerCode(Number(qrCode), user.cpf);
            res.status(200).send({ msg: 'Launcher points successfully' });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async generateQrCocde(req: Request, res: Response): Promise<void> {
        const {promotionId} = req.params;
        const user = (req as any).user;
        try {
            const qrCode = await launcherPointsService.generateQRCode(Number(promotionId), user.id);
            res.status(200).send({ msg: 'QrCode created successfully', qrCode });
        } catch (error) {
            res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
        }
        
    }
}