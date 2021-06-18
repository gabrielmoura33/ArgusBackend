import { getRepository, Repository } from 'typeorm';
import { IAdressRepository } from '@modules/users/repositories/IAdressRepository';
import ICreateAdressDTO from '@modules/users/dtos/ICreateAdressDTO';
import { Point } from 'geojson';
import Address from '../entities/Address';

class AdressRepository implements IAdressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findByLocationRange(
    lat: number,
    long: number,
    range = 1000,
  ): Promise<Address[]> {
    const origin = {
      type: 'Point',
      coordinates: [long, lat],
    };
    const addresses = await this.ormRepository
      .createQueryBuilder('address')
      .select([
        'address.city AS city',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000  AS distance',
      ])
      .where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)',
      )
      .orderBy('distance', 'ASC')
      .setParameters({
        // stringify GeoJSON
        origin: JSON.stringify(origin),
        range: 1000, // KM conversion
      })
      .getRawMany();
    return addresses;
  }

  public async create(data: ICreateAdressDTO): Promise<Address> {
    const pointObject: Point = {
      type: 'Point',
      coordinates: [data.long, data.lat],
    };
    const addressObj = {
      city: data.city,
      location: pointObject,
    };

    const address = await this.ormRepository.create(addressObj);

    await this.save(address);
    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}
export default AdressRepository;
