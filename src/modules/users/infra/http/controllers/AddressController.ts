import { Request, Response } from 'express';
import AdressRepository from '../../typeorm/repositories/AdressRepository';

export default class AdressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const addressRepository = new AdressRepository();
    const { city, lat, long } = request.body;

    const address = await addressRepository.create({
      city,
      lat: Number(lat),
      long: Number(long),
    });

    return response.json(address);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const addressRepository = new AdressRepository();
    const { lat, long, range } = request.query;

    const address = await addressRepository.findByLocationRange(
      Number(lat),
      Number(long),
      Number(range),
    );

    return response.json(address);
  }
}
