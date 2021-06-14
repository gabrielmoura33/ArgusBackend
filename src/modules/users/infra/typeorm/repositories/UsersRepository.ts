import { getRepository, Repository, Not, FindManyOptions } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { classToClass } from 'class-transformer';
import { ICoordinates } from '@shared/dtos/ICoordinates';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    except_user_id,
    filters,
  }: IFindAllProviersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
          isProvider: true,
          mail_confirmed: true,
        },
        ...filters,
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  public async countProviders(query?: FindManyOptions<User>): Promise<number> {
    const countUsers = await this.ormRepository.count(query);

    return countUsers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    this.ormRepository.create(userData);

    const user = await this.ormRepository.save(userData);

    return classToClass(user);
  }

  public async filterByGeolocation(
    coordinates: ICoordinates,
    except_user_id?: string,
    query?: FindManyOptions<User>,
  ): Promise<User[]> {
    console.log('got here');
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .select(['users.*'])
      .leftJoin('users.address', 'addresses')
      .getRawMany();

    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
export default UsersRepository;
