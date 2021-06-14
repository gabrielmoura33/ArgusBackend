import ConfirmUserMailService from '@modules/users/services/ConfirmUserMailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ConfirmMailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const confirmUserMailService = container.resolve(ConfirmUserMailService);
    await confirmUserMailService.execute({
      token: String(token),
    });

    return response.status(204).send();
  }
}
