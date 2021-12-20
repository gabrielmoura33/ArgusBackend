import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/model/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import QueueApiProvider from './QueueProvider/implementations/QueueApiProvider';
import { IQueueApiProvider } from './QueueProvider/model/IQueueApiProvider';

import StripePaymentProvider from './PaymentProvider/implementations/StripePaymentProvider';
import IPaymentProvider from './PaymentProvider/model/IPaymentProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IQueueApiProvider>(
  'QueueApiProvider',
  QueueApiProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
container.registerSingleton<IPaymentProvider>(
  'PaymentProvider',
  StripePaymentProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
