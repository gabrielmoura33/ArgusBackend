import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, classToPlain } from 'class-transformer';
import ListProvidersService from '@modules/appointments/services/ListProviders';
import { IFilters } from '@shared/infra/interfaces/IFilters';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import GetProviderService from '@modules/appointments/services/GetProviderService';
import CreateProviderService from '@modules/appointments/services/CreateProviderService';

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
    const { _latitude, _longitude, _range, category } = request.query;

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
        range: Number(_range) || 1,
      },
      category: (category as string) || undefined,
    });

    return response.json({
      rows: classToClass(providers),
      count: providers.length,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const getProvider = container.resolve(GetProviderService);

    const provider = await getProvider.execute({
      provider_id,
    });

    return response.json({
      rows: classToClass(provider),
      count: 1,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, birth_date, provider_info } = request.body;

    let filename;
    if (request.file) filename = request.file.filename;

    const createProviderService = container.resolve(CreateProviderService);

    const provider = await createProviderService.execute({
      name,
      email,
      password,
      birth_date,
      provider_info: {
        ...provider_info,
        video_url: `${process.env.FILES_URL}/${filename}` || undefined,
      },
    });

    // delete provider.password;
    return response.json(classToPlain(provider));
  }
}
