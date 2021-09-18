export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  isProvider: boolean;
  birth_date: Date;
  mail_confirmed?: boolean;
  isArgusArtist?: boolean;
}
