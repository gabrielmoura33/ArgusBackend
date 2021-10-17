import { ICreateServiceDTO } from '@modules/appointments/dtos/ICreateService.dto';
import IServicesRepository from '@modules/appointments/repositories/IServicesRepository';
import { getRepository, Repository, FindManyOptions } from 'typeorm';
import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async save(data: Service): Promise<Service> {
    return this.save(data);
  }

  public async create(data: ICreateServiceDTO): Promise<Service> {
    this.ormRepository.create(data);

    return this.ormRepository.save(data);
  }

  public async findAllServices(
    query?: FindManyOptions<Service>,
  ): Promise<Service[] | undefined> {
    return this.ormRepository.find(query);
  }

  public async findByName(
    name: string,
    providerId: string,
  ): Promise<Service | undefined> {
    return this.ormRepository.findOne({
      where: { name, provider_id: providerId },
    });
  }
}
export default ServicesRepository;
