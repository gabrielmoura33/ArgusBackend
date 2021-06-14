export default interface ICreateAdressDTO {
  city: string;
  street: string;
  neighborhood: string;
  state: string;
  country: string;
  cep: string;
  number: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
