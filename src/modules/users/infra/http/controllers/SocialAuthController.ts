import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

@injectable()
export default class SocialAuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { social_auth_token } = request.headers;
    console.log(request.headers);
    if (!social_auth_token) throw new AppError('Unauthorized', 401);
    if (social_auth_token !== process.env.SOCIAL_LOGIN_SECRET)
      throw new AppError('Error: Invalid Secret', 401);

    const createUserService = container.resolve(CreateUserService);
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { name, email, password, birth_date, isProvider } = request.body;

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });

      response.setHeader('accessToken', token);
      return response.json({ user: classToClass(user) });
    }

    await createUserService.execute({
      name,
      email,
      password,
      isProvider,
      birth_date,
      mail_confirmed: true,
    });

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    response.setHeader('accessToken', token);
    return response.json({ user: classToClass(user) });
  }
}
