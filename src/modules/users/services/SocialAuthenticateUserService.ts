import { Secret, sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  facebookSecret?: string | null;
  googleSecret?: string | null;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
class SocialAuthenticateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    facebookSecret,
    googleSecret,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email not found', 401);
    }

    if (!facebookSecret && !googleSecret) {
      throw new AppError('Social Authentication requires access-token', 401);
    }

    if (
      facebookSecret &&
      (!user.isFacebookUser ||
        facebookSecret !== process.env.FACEBOOK_LOGIN_SECRET)
    ) {
      throw new AppError('Server unallowed Sign In', 401);
    }

    if (
      googleSecret &&
      (!user.isGoogleUser || googleSecret !== process.env.GOOGLE_LOGIN_SECRET)
    ) {
      throw new AppError('Server unallowed Sign In', 401);
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

export default SocialAuthenticateUserService;
