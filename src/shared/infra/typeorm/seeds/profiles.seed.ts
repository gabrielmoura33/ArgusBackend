import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Profile from '../../../../modules/users/infra/typeorm/entities/Profile';

const SeedData = [
  {
    id: uuid(),
    name: 'Artista Argus',
    description: 'Artistas do estudio Argus',
    price: 72.09,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
  {
    id: uuid(),
    name: 'Artista',
    description: 'Artistas em geral',
    price: 0,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
  {
    id: uuid(),
    name: 'Usuário',
    description: 'Usuários em geral',
    price: 0,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
];
export default class ProfilesSeedData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Profile)
      .values(SeedData)
      .execute();
  }
}
