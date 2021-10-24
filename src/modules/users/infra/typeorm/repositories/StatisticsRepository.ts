import { getRepository, Repository } from 'typeorm';

import { classToClass } from 'class-transformer';

import IStatisticsRepository from '@modules/users/repositories/IStatisticsRepository';
import { ICreateStatisticsDTO } from '@modules/users/dtos/ICreateStatisticsDTO';
import ProviderInfo from '../entities/ProviderInfo';

class StatisticsRepository implements IStatisticsRepository {
  private ormRepository: Repository<ProviderInfo>;

  constructor() {
    this.ormRepository = getRepository(ProviderInfo);
  }

  public async create(data: ICreateStatisticsDTO): Promise<ProviderInfo> {
    const providerStatistic = this.ormRepository.create(data);

    await this.ormRepository.save(data);

    return classToClass(providerStatistic);
  }

  public async save(userStatistic: ProviderInfo): Promise<ProviderInfo> {
    return this.ormRepository.save(userStatistic);
  }
}
export default StatisticsRepository;
