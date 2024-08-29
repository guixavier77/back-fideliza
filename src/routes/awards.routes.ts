import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import StoresController from '../controllers/stores.controller';
import { validateAuth } from '../middlewares/auth';
import { ROLE } from '../../utils/roles';
import AwardsController from '../controllers/awards.controller';

const awardsRouter = Router();

const awardsController = new AwardsController();


awardsRouter.post('/awards', validateAuth([ROLE.SUPERADMIN, ROLE.ADMIN]),(req: Request, res: Response) => awardsController.create(req, res));
awardsRouter.get('/awards', validateAuth([ROLE.SUPERADMIN]),(req: Request, res: Response) => awardsController.getAll(req, res));
awardsRouter.get('/awards/:storeId', validateAuth([ROLE.SUPERADMIN,ROLE.ADMIN]),(req: Request, res: Response) => awardsController.getAllByStore(req, res));



export default awardsRouter