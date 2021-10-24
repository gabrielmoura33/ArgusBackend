import { FindManyOptions } from 'typeorm';
import { ICoordinates } from '@shared/dtos/ICoordinates';
import IFindAllProviersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import ICreateProviderDTO from '../dtos/ICreateProviderDTO';
import Provider from '../infra/typeorm/entities/Provider';

export default interface IProvidersRepository {
  findAllProviders(
    data: IFindAllProviersDTO,
    query?: FindManyOptions<Provider>,
  ): Promise<Provider[]>;
  findAllArgusProviders(
    data: IFindAllProviersDTO,
    query?: FindManyOptions<Provider>,
  ): Promise<Provider[]>;
  countProviders(query?: FindManyOptions<Provider>): Promise<number>;
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  filterByGeolocation(
    coordinates: ICoordinates,
    except_Provider_id?: string,
    query?: FindManyOptions<Provider>,
  ): Promise<Provider[]>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
}
