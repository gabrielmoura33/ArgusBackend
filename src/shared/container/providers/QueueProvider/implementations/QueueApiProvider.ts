import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { IUserQueue } from '../dtos/IUserQueue';

export default class QueueApiProvider {
  public async sendToQueue(data: IUserQueue): Promise<void> {
    try {
      await axios.post(`${process.env.QUEUE_API_URL}/users-controller`, data);
    } catch (error) {
      throw new AppError(
        `Error sending confirmation mail to ${data.email}`,
        500,
      );
    }
  }
}
