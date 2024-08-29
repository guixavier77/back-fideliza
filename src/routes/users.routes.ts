import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';

const usersRouter = Router();

const usersController = new UsersController();
usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
usersRouter.post('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.create);
usersRouter.post('/authUsers', usersController.auth);


export default usersRouter