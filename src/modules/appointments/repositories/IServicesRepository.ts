import { FindManyOptions } from 'typeorm';
import { ICreateServiceDTO } from '../dtos/ICreateService.dto';
import Service from '../infra/typeorm/entities/Service';

export default interface IServicesRepository {
  findAllServices(
    query?: FindManyOptions<Service>,
  ): Promise<Service[] | undefined>;

  create(data: ICreateServiceDTO): Promise<Service>;
  save(data: Service): Promise<Service>;

  findByName(name: string, providerId: string): Promise<Service | undefined>;
}
