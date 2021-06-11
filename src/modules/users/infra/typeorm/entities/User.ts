import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import Service from '@modules/appointments/infra/typeorm/entities/Service';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Address from './Address';
import Statistic from './Statistic';
import Profile from './Profile';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  mail_confirmed: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  birth_date: number;

  @Column({
    nullable: true,
    default: false,
  })
  @Exclude()
  isFacebookUser: boolean;

  @Column({ default: false })
  isProvider: boolean;

  @Exclude()
  @Column({
    nullable: true,
    default: false,
  })
  isGoogleUser: boolean;

  @Exclude()
  @Column({
    nullable: true,
  })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Service, service => service.provider, { nullable: true })
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.provider_id, {
    nullable: true,
  })
  appointmentsProvider: Appointment[];

  @OneToMany(() => Appointment, appointment => appointment.user_id, {
    nullable: true,
  })
  appointmentsUser: Appointment[];

  @OneToOne(() => Statistic)
  statistics: Statistic;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Expose({ name: 'avatar_url' })
  get avatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}
export default User;
