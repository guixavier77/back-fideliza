import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();

const usersController = new UsersController();
usersRouter.get('/users', (req: Request, res: Response) => usersController.getAll(req, res));
usersRouter.post('/users', (req: Request, res: Response) => usersController.create(req, res));



export default usersRouter