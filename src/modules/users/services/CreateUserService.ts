import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProdiver';
import { IQueueApiProvider } from '@shared/container/providers/QueueProvider/model/IQueueApiProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  isProvider: boolean;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('QueueApiProvider')
    private queueApiProvider: IQueueApiProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    isProvider,
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
      isProvider,
    });

    const { token } = await this.userTokensRepository.generate(user.id);
    await this.queueApiProvider.sendToQueue({
      name: user.name,
      email: user.email,
      token,
    });

    if (user.isProvider) {
      await this.cacheProvider.invalidatePrefix('providers-list');
    }

    return user;
  }
}

export default CreateUserService;
