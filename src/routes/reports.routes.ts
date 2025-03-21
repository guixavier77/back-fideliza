import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import AwardsController from '../controllers/awards.controller';
import { validateAuth } from '../middlewares/auth';
import ReportsController from '../controllers/reports.controller';

const reportsRouter = Router();

const reportsController = new ReportsController();

reportsRouter.get('/reports/customer/historyPromotions', validateAuth([ROLE.CUSTOMER]), reportsController.GetHistoryPromotionsCustomer);
reportsRouter.get('/reports/customer/historyPoints', validateAuth([ROLE.CUSTOMER]), reportsController.GetHistoryPointsCustomer);
reportsRouter.get('/reports/operators/historyPoints', validateAuth([ROLE.OPERATOR]), reportsController.GetHistoryLauncherPointsOperator);
reportsRouter.get('/reports/clientsByStore/:storeId', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), reportsController.GetCustomersByStore);




export default reportsRouter