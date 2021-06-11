import ICreateAdressDTO from '../dtos/ICreateAdressDTO';
import Address from '../infra/typeorm/entities/Address';

export interface IAdressRepository {
  findByLocationRange(
    lat: number,
    long: number,
    range: number,
  ): Promise<Address[]>;
  create(data: ICreateAdressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}
