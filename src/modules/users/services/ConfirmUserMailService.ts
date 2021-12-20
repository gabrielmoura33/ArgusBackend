// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IPaymentProvider from '@shared/container/providers/PaymentProvider/model/IPaymentProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
}
@injectable()
class ConfirmUserMailService {
  constructor(
    @inject('PaymentProvider') private paymentProvider: IPaymentProvider,
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not Exist');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not Exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }
    user.mail_confirmed = true;

    // Split responsabilities latter
    const client = await this.paymentProvider.createPaymentClient(
      user.name,
      user.email,
    );

    user.stripe_id = client.id;

    await this.userRepository.save(user);
  }
}

export default ConfirmUserMailService;
