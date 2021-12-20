import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import addressRouter from '@modules/users/infra/http/routes/address.routes';
import confirmMailRouter from '@modules/users/infra/http/routes/confirm_mail.routes';
import paymentsRouter from '@modules/payment/infra/http/routes/payment.routes';

const routes = Router();

routes.use('/providers', providersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRoutter);
routes.use('/profile', profileRouter);
routes.use('/address', addressRouter);
routes.use('/confirm_mail', confirmMailRouter);
routes.use('/payments', paymentsRouter);
export default routes;
