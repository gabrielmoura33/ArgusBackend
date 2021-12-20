import { getRepository, Repository, Raw, Not } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMoutnFromProviderDTO from '@modules/appointments/dtos/IFindAllInMoutnFromProviderDTO';
import IFindAllInDaFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO copy';
import Appointment from '../entities/Appointment';

/*
 * Para usar as funções disponibilizadas pelo TypeORM a classe tem que extender Repository:
 * extends Repository<Appointment>
 */
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  findById(id: string): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, status: { status: Not('WAITING FOR CONFIRMATION') } },
    });

    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMoutnFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDaFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    date,
    provider_id,
    user_id,
    final_price,
    scheduled_time,
    service_id,
    audience,
    open_environment,
    rented_equipment,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id,
      final_price,
      scheduled_time,
      service_id,
      audience,
      open_environment,
      rented_equipment,
      status: {
        status: 'WAITING FOR CONFIRMATION',
      },
    });

    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }
}
export default AppointmentsRepository;
