import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQueueApiProvider } from '@shared/container/providers/QueueProvider/model/IQueueApiProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IStatisticsRepository from '../repositories/IStatisticsRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  mail_confirmed?: boolean;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

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
  }: IRequest): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User already exists');
    }

    const encryptedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: encryptedPassword,
      birth_date,
      mail_confirmed: false,
    });

    const { token } = await this.userTokensRepository.generate(user.id);
    await this.queueApiProvider.sendToQueue({
      name: user.name,
      email: user.email,
      token,
    });

    // if (user.isProvider) {
    //   const providerStatistic = await this.statisticsRepository.create({
    //     reviews: 0,
    //     favorites: 0,
    //     bio: '',
    //     average_review: 0,
    //   });

    //   user.statistics = providerStatistic;

    //   await this.userRepository.save(user);
    // }

    return user;
  }
}

export default CreateUserService;
