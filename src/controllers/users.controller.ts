import { Request,Response } from "express";

export default class UsersController {
    public get(req: Request, res: Response): void {
        res.status(200).json({ message: 'HELLO, WORLD' });

    }
}