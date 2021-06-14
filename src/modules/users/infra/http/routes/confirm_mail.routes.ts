import { Router } from 'express';

import ConfirmMailController from '../controllers/ConfirmMailController';

const confirmMailRouter = Router();
const confirmUserMailController = new ConfirmMailController();

confirmMailRouter.get('/:token', confirmUserMailController.create);

export default confirmMailRouter;
