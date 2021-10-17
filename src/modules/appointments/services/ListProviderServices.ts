import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';
import { IFilters } from '@shared/infra/interfaces/IFilters';

import { FindManyOptions } from 'typeorm';
import { ICreateServiceDTO } from '../dtos/ICreateService.dto';
import IServicesRepository from '../repositories/IServicesRepository';
import Service from '../infra/typeorm/entities/Service';

interface IRequest {
  provider_id: string;
  filters: IFilters<ICreateServiceDTO>;
}
@injectable()
class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private serviceRepository: IServicesRepository,
  ) {}

  public async execute({ provider_id, filters }: IRequest): Promise<Service[]> {
    const query: FindManyOptions<Service> = {};
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
      query.where = [{ provider_id }];
    }

    const services = await this.serviceRepository.findAllServices(query);
    return classToClass(services as Service[]);
  }
}

export default ListServicesService;
