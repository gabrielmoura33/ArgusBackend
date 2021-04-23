import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import SocialAuthenticateUserService from '@modules/users/services/SocialAuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const { facebooksecret, googlesecret } = request.headers;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    if (facebooksecret || googlesecret) {
      const socialAuthenticateUserService = container.resolve(
        SocialAuthenticateUserService,
      );
      const { user, token } = await socialAuthenticateUserService.execute({
        facebookSecret: facebooksecret ? String(facebooksecret) : null,
        email,
        googleSecret: googlesecret ? String(googlesecret) : null,
      });
      return response.json({ user: classToClass(user), token });
    }
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    return response.json({ user: classToClass(user), token });
  }
}
