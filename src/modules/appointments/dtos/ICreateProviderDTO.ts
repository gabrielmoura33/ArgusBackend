export interface ICreateProviderInfoDTO {
  favorites: number;
  reviews: number;
  average_review: number;
  bio: string;
  work_schedule: string;
  week_schedule: string;
  video_url: string;
}
export default interface ICreateProviderDTO {
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  mail_confirmed?: boolean;
  isArgusArtist?: boolean;
  provider_info: ICreateProviderInfoDTO;
}
