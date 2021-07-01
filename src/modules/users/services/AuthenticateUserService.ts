import { Secret, sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password?: string;
  isSocialAuthentication?: boolean;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    isSocialAuthentication,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email/password combination does not match', 401);
    }

    if (isSocialAuthentication) {
      const { secret } = authConfig.jwt;

      const token = sign({}, secret as Secret, {
        subject: user.id,
        expiresIn: '1d',
      });
      return {
        user,
        token,
      };
    }

    if (!password) {
      throw new AppError('email/password combination does not match', 401);
    }

    if (!user.mail_confirmed) {
      throw new AppError('User not confirmed');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('email/password combination does not match', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret as Secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
