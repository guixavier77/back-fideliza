import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import RequestAwardController from '../controllers/requestAward.controller';
import { validateAuth } from '../middlewares/auth';

const othersRoutes = Router();

const requestAwardController = new RequestAwardController();

othersRoutes.post('/requestAward/:promotionId', validateAuth([ROLE.CUSTOMER]), requestAwardController.request);



export default othersRoutes