import { IUserQueue } from '../dtos/IUserQueue';

export interface IQueueApiProvider {
  sendToQueue(data: IUserQueue): Promise<void>;
}
