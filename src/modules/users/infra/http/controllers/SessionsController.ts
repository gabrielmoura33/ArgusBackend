import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import AuthenticateProviderService from '@modules/users/services/AuthenticateProviderService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    response.setHeader('accessToken', token);

    return response.json({ user: classToClass(user) });
  }

  async createProvider(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(
      AuthenticateProviderService,
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    response.setHeader('accessToken', token);

    return response.json({ user: classToClass(user) });
  }
}
