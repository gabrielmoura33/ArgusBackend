import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Appointment from './Appointment';

@Entity('status')
class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appointment_id: string;

  @OneToMany(() => Appointment, appointment => appointment.status)
  appointments: Appointment[];

  @Column()
  status: 'WAITING FOR CONFIRMATION' | 'CONFIRMED' | 'DONE' | 'CANCELED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Status;
