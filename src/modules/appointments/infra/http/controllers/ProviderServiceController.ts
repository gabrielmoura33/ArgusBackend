import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListServicesService from '@modules/appointments/services/ListProviderServices';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import { ICreateServiceDTO } from '@modules/appointments/dtos/ICreateService.dto';
import CreateServiceService from '@modules/appointments/services/CreateService.service';

export default class ProviderServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const {
      _limit,
      _page,
      _sort,
      _order,
      _count,
      _search,
    }: IFilters<ICreateServiceDTO> = request.query;
    const listProviderServices = container.resolve(ListServicesService);

    const services = await listProviderServices.execute({
      provider_id,
      filters: {
        _limit,
        _page,
        _sort,
        _order,
        _count,
        _search,
      },
    });

    return response.json({
      rows: classToClass(services),
      count: services.length,
    });
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      category_id,
      serviceAddons,
      price,
    } = request.body;
    const provider_id = request.user.id;
    const createServiceService = container.resolve(CreateServiceService);
    const service = await createServiceService.execute({
      name,
      description,
      category_id,
      serviceAddons,
      provider_id,
      price: Number(price),
    });

    return response.json({
      rows: classToClass(service),
      count: 1,
    });
  }
}
