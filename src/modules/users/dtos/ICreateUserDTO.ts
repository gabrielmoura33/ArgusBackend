export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  mail_confirmed?: boolean;
}
