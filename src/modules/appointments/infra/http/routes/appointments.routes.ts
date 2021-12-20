import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
      final_price: Joi.number(),
      scheduled_time: Joi.number(),
      service_id: Joi.string(),
      audience: Joi.number(),
      open_environment: Joi.boolean(),
      rented_equipment: Joi.boolean(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.patch('/:id/status', appointmentsController.changeStatus);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
