import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IServicesRepository from '../repositories/IServicesRepository';

import ServiceAddon from '../infra/typeorm/entities/ServiceAddons';
import Service from '../infra/typeorm/entities/Service';

interface IRequest {
  provider_id: string;
  name: string;
  description: string;
  category_id: string;
  serviceAddons?: ServiceAddon[];
  price: number;
}

@injectable()
class CreateServiceService {
  constructor(
    @inject('ServicesRepository')
    private serviceRepository: IServicesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Service> {
    const existService = await this.serviceRepository.findByName(
      data.name,
      data.provider_id,
    );

    if (existService) {
      throw new AppError(
        'A Service with this name already exist for this provider',
        401,
      );
    }

    const service = await this.serviceRepository.create(data);

    return service;
  }
}

export default CreateServiceService;
