import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import SocialAuthController from '../controllers/SocialAuthController';

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
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isProvider: Joi.boolean(),
      birth_date: Joi.date(),
      avatar_url: Joi.string().optional(),
    },
  }),
  socialAuthController.create,
);

export default sessionsRouter;
