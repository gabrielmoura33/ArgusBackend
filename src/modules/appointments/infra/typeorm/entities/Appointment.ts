import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import Service from './Service';
import Status from './Status';
import Provider from './Provider';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider[];

  @Column()
  user_id: string;

  @Column()
  status_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  service_id: string;

  @ManyToOne(() => Service, {
    eager: true,
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Status, { eager: true, cascade: true })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column('timestamp with time zone')
  date: Date;

  @Column({ default: 60 })
  scheduled_time: number;

  @Column({ type: 'float' })
  final_price: number;

  @Column({ default: 0 })
  audience: number;

  @Column({ default: false })
  open_environment: boolean;

  @Column({ default: false })
  rented_equipment: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
