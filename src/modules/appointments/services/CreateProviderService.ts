import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQueueApiProvider } from '@shared/container/providers/QueueProvider/model/IQueueApiProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IStatisticsRepository from '@modules/users/repositories/IStatisticsRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';
import Provider from '../infra/typeorm/entities/Provider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  mail_confirmed?: boolean;
  provider_info: {
    bio?: string;
    video_url?: string;
    week_schedule: string;
    work_schedule: string;
  };
}
@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('QueueApiProvider')
    private queueApiProvider: IQueueApiProvider,

    @inject('StatisticsRepository')
    private statisticsRepository: IStatisticsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    birth_date,
    mail_confirmed = false,
    provider_info,
  }: IRequest): Promise<Provider> {
    const providerExist = await this.providersRepository.findByEmail(email);
    const { week_schedule, bio, video_url, work_schedule } = provider_info;
    if (providerExist) {
      throw new AppError('User already exists');
    }

    const encryptedPassword = await this.hashProvider.generateHash(password);

    const provider = await this.providersRepository.create({
      name,
      email,
      password: encryptedPassword,
      birth_date,
      mail_confirmed,
      provider_info: {
        bio: bio || '',
        video_url: video_url || '',
        average_review: 0,
        favorites: 0,
        reviews: 0,
        week_schedule,
        work_schedule,
      },
    });

    if (!mail_confirmed) {
      const { token } = await this.userTokensRepository.generate(provider.id);
      await this.queueApiProvider.sendToQueue({
        name: provider.name,
        email: provider.email,
        token,
      });
    }

    return provider;
  }
}

export default CreateProviderService;
