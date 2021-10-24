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

import Appointment from './Appointment';
import Provider from './Provider';
import Category from './category';
import ServiceAddon from './ServiceAddons';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ServiceAddon, serviceAddon => serviceAddon.service, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  serviceAddons: ServiceAddon[];
}

export default Service;
