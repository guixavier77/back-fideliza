import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import DashboardController from '../controllers/dashboard.controller';
import { validateAuth } from '../middlewares/auth';

const dashBoardRouter = Router();

const dashboardController = new DashboardController();

dashBoardRouter.get('/dashboard/totals/:storeId', validateAuth([ROLE.SUPERADMIN, ROLE.ADMIN]), dashboardController.getResults);




export default dashBoardRouter