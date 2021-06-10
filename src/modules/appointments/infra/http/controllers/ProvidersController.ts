import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      _limit,
      _page,
      _sort,
      _order,
      _count,
      _search,
    }: IFilters<ICreateUserDTO> = request.query;
    const { _latitude, _longitude } = request.query;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
      filters:
        {
          _limit,
          _page,
          _sort,
          _order,
          _count,
          _search,
        } || {},
      coordinates: {
        latitude: Number(_latitude) || 0,
        longitude: Number(_longitude) || 0,
      },
    });

    return response.json(classToClass(providers));
  }
}
