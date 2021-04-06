import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepostory from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepostory,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You Can't create an appointment on a past date");
    }
    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (user_id === provider_id) {
      throw new AppError('You cant Create an appointment to yourself');
    }

    if (findAppointmentsInSameDate) {
      throw new AppError('Already have an appointment in this date');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });
    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
