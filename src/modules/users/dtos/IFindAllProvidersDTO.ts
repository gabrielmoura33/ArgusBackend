import { FindManyOptions } from 'typeorm';
import User from '../infra/typeorm/entities/User';

export default interface IFindAllProviersDTO {
  except_user_id?: string;
  filters: FindManyOptions<User>;
}
