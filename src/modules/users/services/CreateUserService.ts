import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProdiver';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}

export default CreateUserService;
