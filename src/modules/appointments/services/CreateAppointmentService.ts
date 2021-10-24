import { startOfHour, isBefore, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepostory from '../repositories/IAppointmentsRepository';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
  final_price: number;
  scheduled_time: number;
  service_id: string;
  audience: number;

  open_environment: boolean;

  rented_equipment: boolean;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepostory,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('ServicesRepository')
    private serviceRepository: IServicesRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
    final_price,
    scheduled_time,
    service_id,
    audience,
    open_environment,
    rented_equipment,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You Can't create an appointment on a past date");
    }

    const verifyProviderService = await this.serviceRepository.findAllServices({
      where: { provider_id, id: service_id },
    });

    if (!verifyProviderService) {
      throw new AppError(
        "You can't create an appointment to a provider that not owns it",
      );
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
      final_price,
      scheduled_time,
      service_id,
      audience,
      open_environment,
      rented_equipment,
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
