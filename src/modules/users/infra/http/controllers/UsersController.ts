import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToPlain } from 'class-transformer';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const {
      name,
      email,
      password,
      birth_date,
      isProvider,
      isArgusArtist,
    } = request.body;

    const user = await userService.execute({
      name,
      email,
      password,
      isProvider,
      birth_date,
      isArgusArtist,
    });

    delete user.password;
    return response.json(classToPlain(user));
  }
}
