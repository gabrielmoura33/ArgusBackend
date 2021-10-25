import { Secret, sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IProvidersRepository from '@modules/appointments/repositories/IProvidersRepository';
import Provider from '@modules/appointments/infra/typeorm/entities/Provider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password?: string;
  isSocialAuthentication?: boolean;
}
interface IResponse {
  user: Provider;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    isSocialAuthentication,
  }: IRequest): Promise<IResponse> {
    const user = await this.providersRepository.findByEmail(email);

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
