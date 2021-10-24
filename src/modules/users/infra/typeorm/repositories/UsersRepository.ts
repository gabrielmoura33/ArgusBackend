import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { classToClass } from 'class-transformer';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
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

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
export default UsersRepository;
