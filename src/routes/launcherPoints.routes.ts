import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import LauncherPointsController from '../controllers/launcherPoints.controller';
import { validateAuth } from '../middlewares/auth';

const launcherPointsRouter = Router();

const launcherPointsController = new LauncherPointsController();

launcherPointsRouter.post('/launcherPoints/cpf', validateAuth([ROLE.OPERATOR, ROLE.ADMIN]), launcherPointsController.launcherByCpf);
launcherPointsRouter.get('/launcherPoints/generateQrCode/:promotionId', validateAuth([ROLE.OPERATOR, ROLE.ADMIN]), launcherPointsController.generateQrCocde);
launcherPointsRouter.post('/launcherPoints/qrCode/:qrCode', validateAuth([ROLE.CUSTOMER]), launcherPointsController.launcherByQrCode);




export default launcherPointsRouter