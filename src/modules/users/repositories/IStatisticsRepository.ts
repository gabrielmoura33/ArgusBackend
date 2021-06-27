import { ICreateStatisticsDTO } from '../dtos/ICreateStatisticsDTO';
import Statistic from '../infra/typeorm/entities/Statistic';

export default interface IStatisticsRepository {
  create(data: ICreateStatisticsDTO): Promise<Statistic>;
  save(user: Statistic): Promise<Statistic>;
}
