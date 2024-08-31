import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import StoresController from '../controllers/stores.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';

const storesRouter = Router();

const storesController = new StoresController();


storesRouter.post('/stores', validateAuth([ROLE.SUPERADMIN]),storesController.create);
storesRouter.put('/stores', validateAuth([ROLE.SUPERADMIN]),storesController.update);
storesRouter.get('/stores', validateAuth([ROLE.SUPERADMIN]),storesController.getAll);
storesRouter.get('/stores/:storeId', validateAuth([ROLE.SUPERADMIN,ROLE.ADMIN]),storesController.getOne);



export default storesRouter