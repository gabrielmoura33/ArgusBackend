import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';

import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ArgusProvidersController from '../controllers/ArgusProvidersController';
import ProviderServiceController from '../controllers/ProviderServiceController';

const providersRouter = Router();

const providersController = new ProvidersController();
const monthAvailabilityController = new ProviderMonthAvailabilityController();
const dayAvailabilityController = new ProviderDayAvailabilityController();
const argusProvidersController = new ArgusProvidersController();
const providerServiceController = new ProviderServiceController();

// Non Authenticated Route
providersRouter.post('/', providersController.create);

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);
providersRouter.get('/argus_providers', argusProvidersController.index);

providersRouter.get('/:provider_id', providersController.show);
providersRouter.get('/:provider_id/services', providerServiceController.index);
providersRouter.post('/service', providerServiceController.save);

providersRouter.post(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  monthAvailabilityController.index,
);
providersRouter.post(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  dayAvailabilityController.index,
);

export default providersRouter;
