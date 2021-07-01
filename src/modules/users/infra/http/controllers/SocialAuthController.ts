import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

@injectable()
export default class SocialAuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const createUserService = container.resolve(CreateUserService);
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const {
      name,
      email,
      verified_email,
      birth_date,
      isProvider,
      picture,
    } = request.body;

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      const { user, token } = await authenticateUserService.execute({
        email,
        isSocialAuthentication: true,
      });

      response.setHeader('accessToken', token);
      return response.json({
        user: {
          ...classToClass(user),
          avatar_url: picture,
        },
      });
    }

    await createUserService.execute({
      name,
      email,
      password: '',
      isProvider,
      birth_date,
      mail_confirmed: verified_email,
    });

    const { user, token } = await authenticateUserService.execute({
      email,
      isSocialAuthentication: true,
    });

    response.setHeader('accessToken', token);

    return response.json({
      user: {
        ...classToClass(user),
        avatar_url: picture,
      },
    });
  }
}
