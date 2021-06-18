import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { FindManyOptions, Like } from 'typeorm';

interface IRequest {
  user_id: string;
  filters: IFilters<ICreateUserDTO>;
  coordinates: {
    latitude: number;
    longitude: number;
    range: number;
  };
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    filters,
    coordinates,
  }: IRequest): Promise<User[]> {
    const query: FindManyOptions<User> = {};
    const { _limit, _sort, _order, _page, _search } = filters;

    if (_limit) {
      query.take = _limit;
    }

    if (_page) {
      query.skip = 10 * (_page - 1 < 0 ? 0 : _page - 1);
    }

    if (_sort) {
      query.order = {
        [_sort]: _order?.toUpperCase() || 'ASC',
      };
    } else if (_order) {
      query.order = {
        name: 'ASC',
      };
    }

    if (_search) {
      query.where = [
        { name: Like(`%${_search}%`) },
        { email: Like(`%${_search}%`) },
      ];
    }

    if (coordinates.latitude) {
      const users = await this.userRepository.filterByGeolocation(
        coordinates,
        user_id,
        query,
      );

      return classToClass(users);
    }

    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id,
      filters: query,
    });

    return classToClass(users);
  }
}

export default ListProvidersService;
