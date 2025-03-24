import { Request, Response } from "express";
import SendEmailService from "../services/sendEmail.service";
import UsersService from "../services/users.service";
import RequestAwardService from "../services/requestAward.service";

const requestAwardService = new RequestAwardService();
const sendEmailService = new SendEmailService();
export default class RequestAwardController {

    async request(req: Request, res: Response): Promise<void> {
        const user = (req as any).user;
        const {promotionId} = req.params;

        try {
            const request = await requestAwardService.request(Number(user.id), Number(promotionId))
            res.status(200).send({ msg: 'successfull', request });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}