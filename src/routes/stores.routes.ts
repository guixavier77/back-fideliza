import {Router, Response, Request} from 'express';
import UsersController from '../controllers/users.controller';
import StoresController from '../controllers/stores.controller';

const storesRouter = Router();

const storesController = new StoresController();


storesRouter.post('/stores', (req: Request, res: Response) => storesController.create(req, res));
storesRouter.get('/stores', (req: Request, res: Response) => storesController.getAll(req, res));



export default storesRouter