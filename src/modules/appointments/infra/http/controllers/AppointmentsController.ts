import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      provider_id,
      date,
      scheduled_time,
      final_price,
      service_id,
    } = request.body;
    const user_id = request.user.id;
    const parsedDate = date;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
      user_id,
      scheduled_time: Number(scheduled_time),
      final_price: Number(final_price),
      service_id,
    });
    return response.json(appointment);
  }
}
