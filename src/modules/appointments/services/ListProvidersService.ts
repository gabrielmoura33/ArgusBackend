import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProdiver';

interface IRequest {
  user_id: string;
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        users.map(u => {
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            isProvider: u.isProvider,
            avatar: u.avatar,
            created_at: u.created_at,
            updated_at: u.updated_at,
          };
        }),
      );
    }

    return classToClass(users);
  }
}

export default ListProvidersService;
