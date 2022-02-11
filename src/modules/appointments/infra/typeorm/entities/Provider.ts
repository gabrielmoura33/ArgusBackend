import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import Address from '@modules/users/infra/typeorm/entities/Address';
import ProviderInfo from '@modules/users/infra/typeorm/entities/ProviderInfo';
import Service from './Service';
import Appointment from './Appointment';
import Category from './category';

@Entity('providers')
class Provider {
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
  isArgusArtist: boolean;

  @Column({
    nullable: true,
  })
  avatar: string;

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
  appointments: Appointment[];

  @OneToOne(() => ProviderInfo, { eager: true, cascade: true })
  @JoinColumn({ name: 'provider_info_id' })
  providerInfo: ProviderInfo;

  @OneToOne(() => Category, { eager: true, cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Expose({ name: 'avatar_url' })
  get avatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}
export default Provider;
