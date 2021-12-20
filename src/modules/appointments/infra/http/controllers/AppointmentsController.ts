import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      provider_id,
      date,
      scheduled_time,
      final_price,
      service_id,
      audience,
      open_environment,
      rented_equipment,
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
      audience,
      open_environment,
      rented_equipment,
    });
    return response.json(appointment);
  }

  public async changeStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const appointmentsRepository = new AppointmentsRepository();
    const appointment = await appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    appointment.status = {
      status: 'PAYMENT_CONFIRMED',
    } as any;

    await appointmentsRepository.save(appointment);
    return response.send();
  }
}
