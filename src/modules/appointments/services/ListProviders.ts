import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { FindManyOptions, Like } from 'typeorm';
import IProvidersRepository from '../repositories/IProvidersRepository';
import Provider from '../infra/typeorm/entities/Provider';

interface IRequest {
  user_id: string;
  filters: IFilters<ICreateUserDTO>;
  category?: string;
  coordinates: {
    latitude: number;
    longitude: number;
    range: number;
  };
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    filters,
    coordinates,
    category,
  }: IRequest): Promise<Provider[]> {
    const query: FindManyOptions<Provider> = {};
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

    let providers = [];
    if (coordinates.latitude) {
      providers = await this.providersRepository.filterByGeolocation(
        coordinates,
        user_id,
        query,
      );
    }

    providers = await this.providersRepository.findAllProviders({
      except_user_id: user_id,
      filters: query,
    });

    if (category) {
      const providersFiltered = providers.filter(
        el =>
          el.services.filter(
            service =>
              service.category.name.toLocaleLowerCase() ===
              category.toLowerCase(),
          ).length > 0,
      );

      return classToClass(providersFiltered);
    }

    return classToClass(providers);
  }
}

export default ListProvidersService;
