import { Request,Response } from "express";
import UsersService from "../services/users.service";
import SendEmailService from "../services/sendEmail.service";
import { ROLE } from "../../utils/roles";
import jwt from 'jsonwebtoken';

const usersService = new UsersService();
const sendEmailService = new SendEmailService();
export default class UsersController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await usersService.createUser(req.body);
            await sendEmailService.confirmRegister(user.email)
            res.status(200).send({ msg: 'User created successfull', user });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await usersService.update(req.body);
            res.status(200).send({ msg: 'User updated successfull', user });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const user = (req as any).user;
        try {
            const users = await usersService.getAll(user.role);
            res.status(200).send({ msg: 'Get users successfull', users });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });

        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try{
            const token = await usersService.refreshToken(req.body.token);
            res.status(200).send({msg: 'New token generated', token}) 
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });

        }
    }

    async auth(req: Request, res: Response): Promise<void> {
        try{
            const {user, token} = await usersService.auth(req.body);
            res.status(200).send({msg: 'Login success', user, token}) 
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }


    async sendEmailResetPassword(req: Request, res: Response): Promise<void> {
        const {email} = req.params;
        try{
            const user = await usersService.sendEmailResetPassword(email);
            res.status(200).send({msg: 'Login success', user}) 
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        const {password} = req.params;
        const {token} = req.body;
        if (!token) res.status(401).send({ msg: 'Token not found' });
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        try{
            const user = await usersService.changePassword(password, decoded.id);
            res.status(200).send({msg: 'Change password success', user}) 
        }catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Unknown error' });
        }
    
    }
}