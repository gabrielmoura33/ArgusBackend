import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToPlain } from 'class-transformer';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const { name, email, password, birth_date, isProvider } = request.body;
    console.log(request.body);
    const user = await userService.execute({
      name,
      email,
      password,
      isProvider,
      birth_date,
    });

    return response.json(classToPlain(user));
  }
}
