import { Router } from 'express';
import { ROLE } from '../../utils/roles';
import AwardsController from '../controllers/awards.controller';
import { validateAuth } from '../middlewares/auth';

const awardsRouter = Router();

const awardsController = new AwardsController();

awardsRouter.post('/awards', validateAuth([ROLE.SUPERADMIN, ROLE.ADMIN]), awardsController.create);
awardsRouter.get('/awards/:storeId', validateAuth([ROLE.SUPERADMIN,ROLE.ADMIN]), awardsController.getAllByStore);



export default awardsRouter