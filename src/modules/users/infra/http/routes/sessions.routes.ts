import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import SocialAuthController from '../controllers/SocialAuthController';
import fetchGoogleInfo from '../middlewares/fetchGoogleInfo';
import fetchFacebookInfo from '../middlewares/fetchFacebookInfo';

const sessionsRouter = Router();
const sessionController = new SessionsController();
const socialAuthController = new SocialAuthController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  }),
  sessionController.create,
);

sessionsRouter.post(
  '/social-auth/google',
  fetchGoogleInfo,
  socialAuthController.create,
);

sessionsRouter.post(
  '/social-auth/facebook',
  fetchFacebookInfo,
  socialAuthController.create,
);

export default sessionsRouter;
