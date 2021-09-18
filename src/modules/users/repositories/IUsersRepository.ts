import { FindManyOptions } from 'typeorm';
import { ICoordinates } from '@shared/dtos/ICoordinates';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProviersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(
    data: IFindAllProviersDTO,
    query?: FindManyOptions<User>,
  ): Promise<User[]>;
  findAllArgusProviders(
    data: IFindAllProviersDTO,
    query?: FindManyOptions<User>,
  ): Promise<User[]>;
  countProviders(query?: FindManyOptions<User>): Promise<number>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  filterByGeolocation(
    coordinates: ICoordinates,
    except_user_id?: string,
    query?: FindManyOptions<User>,
  ): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
