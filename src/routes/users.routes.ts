import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';

const usersRouter = Router();

const usersController = new UsersController();
usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), (req: Request, res: Response) => usersController.getAll(req, res));
usersRouter.post('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), (req: Request, res: Response) => usersController.create(req, res));
usersRouter.post('/authUsers', (req: Request, res: Response) => usersController.auth(req, res));



export default usersRouter