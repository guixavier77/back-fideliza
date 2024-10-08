import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';

const usersRouter = Router();

const usersController = new UsersController();
usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
usersRouter.post('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.create);
usersRouter.put('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.update);
usersRouter.post('/authUsers', usersController.auth);
usersRouter.post('/refreshToken', usersController.refreshToken);


export default usersRouter