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
import Service from '../../../../appointments/infra/typeorm/entities/Service';
import Appointment from '../../../../appointments/infra/typeorm/entities/Appointment';
import Address from './Address';

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
  birth_date: Date;

  @Column({ default: false })
  isProvider: boolean;

  @Column({ default: false })
  isArgusArtist: boolean;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  stripe_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Address, { nullable: true, cascade: true, eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Service, service => service.provider, {
    nullable: true,
    eager: true,
  })
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.provider_id, {
    nullable: true,
  })
  appointmentsProvider: Appointment[];

  @OneToMany(() => Appointment, appointment => appointment.user_id, {
    nullable: true,
  })
  appointmentsUser: Appointment[];

  @ManyToOne(() => Profile, { cascade: true, eager: true })
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
