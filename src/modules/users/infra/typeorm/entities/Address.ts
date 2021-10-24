import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Point } from 'geojson';
import Provider from '@modules/appointments/infra/typeorm/entities/Provider';
import User from './User';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  number: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  provider_id: string;

  // CONSTRAINTS
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Address;
