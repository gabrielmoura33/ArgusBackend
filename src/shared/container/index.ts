import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import IStatisticsRepository from '@modules/users/repositories/IStatisticsRepository';
import StatisticsRepository from '@modules/users/infra/typeorm/repositories/StatisticsRepository';
import IServicesRepository from '@modules/appointments/repositories/IServicesRepository';
import ServicesRepository from '@modules/appointments/infra/typeorm/repositories/ServicesRepository';
import IProvidersRepository from '@modules/appointments/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/appointments/infra/typeorm/repositories/ProvidersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IStatisticsRepository>(
  'StatisticsRepository',
  StatisticsRepository,
);

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);
