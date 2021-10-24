import Provider from '@modules/appointments/infra/typeorm/entities/Provider';
import { FindManyOptions } from 'typeorm';

export default interface IFindAllProviersDTO {
  except_user_id?: string;
  filters: FindManyOptions<Provider>;
}
