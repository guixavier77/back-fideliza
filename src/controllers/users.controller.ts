import { Request,Response } from "express";
import UsersService from "../services/users.service";

export default class UsersController {
    private usersService = new UsersService();
    public getAll(req: Request, res: Response): Promise<any> {
        return this.usersService.getAll();
    }
}