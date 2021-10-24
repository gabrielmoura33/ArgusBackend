import { getRepository, Repository, Not, FindManyOptions } from 'typeorm';

import IFindAllProviersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { classToClass } from 'class-transformer';
import { ICoordinates } from '@shared/dtos/ICoordinates';
import IProvidersRepository from '@modules/appointments/repositories/IProvidersRepository';

import ICreateProviderDTO from '@modules/appointments/dtos/ICreateProviderDTO';
import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findAllProviders({
    except_user_id,
    filters,
  }: IFindAllProviersDTO): Promise<Provider[]> {
    let providers: Provider[];

    if (except_user_id) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
          mail_confirmed: true,
        },
        ...filters,
      });
    } else {
      providers = await this.ormRepository.find();
    }

    return providers;
  }

  public async findAllArgusProviders({
    except_user_id,
    filters,
  }: IFindAllProviersDTO): Promise<Provider[]> {
    let providers: Provider[];

    if (except_user_id) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
          mail_confirmed: true,
          isArgusArtist: true,
        },
        ...filters,
      });
    } else {
      providers = await this.ormRepository.find();
    }

    return providers;
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne({
      where: { email },
    });

    return provider || undefined;
  }

  public async countProviders(
    query?: FindManyOptions<Provider>,
  ): Promise<number> {
    const countProviders = await this.ormRepository.count(query);

    return countProviders;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne(id);

    return provider;
  }

  public async create({
    provider_info,
    ...rest
  }: ICreateProviderDTO): Promise<Provider> {
    this.ormRepository.create({
      ...rest,
      providerInfo: provider_info,
    });

    const provider = await this.ormRepository.save({
      ...rest,
      providerInfo: provider_info,
    });

    return classToClass(provider);
  }

  public async filterByGeolocation(
    { latitude, longitude, range = 1 }: ICoordinates,
    except_user_id?: string,
    query?: FindManyOptions<Provider>,
  ): Promise<Provider[]> {
    const origin = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const providers = await this.ormRepository
      .createQueryBuilder('providers')
      .select([
        `providers.id, providers.name, providers.email, CONCAT('${process.env.APP_API_URL}/files/', providers.avatar) as avatar_url`,
      ])
      .innerJoin('providers.address', 'addresses')

      .where(
        'ST_DWithin(addresses.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(addresses.location)) ,:range)',
      )
      .andWhere('providers.isProvider = true')
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: range * 1000, // KM conversion
      })
      .limit(query?.take)
      .skip(query?.skip)
      .getRawMany();

    return providers;
  }

  public async save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }
}
export default ProvidersRepository;
