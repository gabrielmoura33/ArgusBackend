import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import Appointment from './Appointment';
import Category from './category';
import ServiceAddon from './ServiceAddons';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @OneToMany(() => Appointment, appointment => appointment.services)
  appointments: Appointment[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ServiceAddon, serviceAddon => serviceAddon.service, {
    cascade: true,
    eager: true,
  })
  serviceAddons: ServiceAddon[];
}

export default Service;
