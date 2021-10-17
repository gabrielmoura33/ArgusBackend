import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  provider_id: string;
}
@injectable()
class GetProviderService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(provider_id);

    if (!user?.isProvider) return {} as User;

    return user || ({} as User);
  }
}

export default GetProviderService;
