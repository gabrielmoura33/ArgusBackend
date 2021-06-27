import { getRepository, Repository } from 'typeorm';

import { classToClass } from 'class-transformer';

import IStatisticsRepository from '@modules/users/repositories/IStatisticsRepository';
import { ICreateStatisticsDTO } from '@modules/users/dtos/ICreateStatisticsDTO';
import Statistic from '../entities/Statistic';

class StatisticsRepository implements IStatisticsRepository {
  private ormRepository: Repository<Statistic>;

  constructor() {
    this.ormRepository = getRepository(Statistic);
  }

  public async create(data: ICreateStatisticsDTO): Promise<Statistic> {
    const providerStatistic = this.ormRepository.create(data);

    await this.ormRepository.save(data);

    return classToClass(providerStatistic);
  }

  public async save(userStatistic: Statistic): Promise<Statistic> {
    return this.ormRepository.save(userStatistic);
  }
}
export default StatisticsRepository;
