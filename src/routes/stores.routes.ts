import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import StoresController from '../controllers/stores.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';

const storesRouter = Router();

const storesController = new StoresController();


storesRouter.post('/stores', validateAuth([ROLE.SUPERADMIN]),(req: Request, res: Response) => storesController.create(req, res));
storesRouter.get('/stores', validateAuth([ROLE.SUPERADMIN]),(req: Request, res: Response) => storesController.getAll(req, res));
storesRouter.get('/stores/:storeId', validateAuth([ROLE.SUPERADMIN,ROLE.ADMIN]),(req: Request, res: Response) => storesController.getOne(req, res));



export default storesRouter