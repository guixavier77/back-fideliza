import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import PromotionsController from '../controllers/promotions.controller';
import { validateAuth } from '../middlewares/auth';

const promotionsRouter = Router();

const promotionsController = new PromotionsController();

promotionsRouter.post('/promotions', validateAuth([ROLE.SUPERADMIN, ROLE.ADMIN]), promotionsController.create);
promotionsRouter.put('/promotions', validateAuth([ROLE.SUPERADMIN, ROLE.ADMIN]), promotionsController.update);
promotionsRouter.get('/promotions/:storeId', validateAuth([ROLE.SUPERADMIN,ROLE.ADMIN]), promotionsController.getAllByStore);



export default promotionsRouter