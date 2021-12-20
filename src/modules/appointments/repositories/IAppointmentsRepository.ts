import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMoutnFromProviderDTO from '../dtos/IFindAllInMoutnFromProviderDTO';
import IFindAllInDaFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO copy';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMoutnFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDaFromProviderDTO,
  ): Promise<Appointment[]>;

  findById(id: string): Promise<Appointment | undefined>;
}
