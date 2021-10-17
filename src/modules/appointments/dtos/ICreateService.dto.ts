import ServiceAddon from '../infra/typeorm/entities/ServiceAddons';

export interface ICreateServiceDTO {
  provider_id: string;
  price: number;
  name: string;
  description: string;
  category_id: string;
  serviceAddons?: ServiceAddon[];
}
