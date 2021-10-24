import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { FindManyOptions } from 'typeorm';
import IProvidersRepository from '../repositories/IProvidersRepository';
import Provider from '../infra/typeorm/entities/Provider';

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
class ListArgusProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    filters,
    coordinates,
  }: IRequest): Promise<Provider[]> {
    const query: FindManyOptions<Provider> = {};
    const { _limit, _sort, _order, _page } = filters;

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

    if (coordinates.latitude) {
      const providers = await this.providersRepository.filterByGeolocation(
        coordinates,
        user_id,
        query,
      );

      return classToClass(providers);
    }

    const providers = await this.providersRepository.findAllArgusProviders({
      except_user_id: user_id,
      filters: query,
    });

    return classToClass(providers);
  }
}

export default ListArgusProvidersService;
