import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { Point } from 'geojson';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import ICreateAdressDTO from '../dtos/ICreateAdressDTO';
import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  address?: ICreateAdressDTO;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    address,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use');
    }

    user.name = name;
    user.email = email;

    if (address) {
      let location;
      const { coordinates } = address;
      if (coordinates) {
        location = {
          type: 'Point',
          coordinates: [coordinates.longitude, coordinates.latitude],
        } as Point;
      }

      user.address = {
        id: user.address?.id || undefined,
        cep: address.cep,
        city: address.city,
        country: address.country || 'Brasil',
        location: location || null,
        number: address.number,
        state: address.state,
        street: address.street,
        neighborhood: address.neighborhood,
      } as Address;
    }

    if (password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password || '',
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
