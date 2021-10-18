export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
  final_price: number;
  scheduled_time: number;
  service_id: string;
}
