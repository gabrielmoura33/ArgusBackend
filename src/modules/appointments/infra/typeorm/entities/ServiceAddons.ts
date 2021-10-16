import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Service from './Service';

@Entity('service_addons')
class ServiceAddon {
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

  @Column({ nullable: true })
  min_value: number;

  @Column({ nullable: true })
  max_value: number;

  @Column({ default: false })
  default: boolean;

  @Column({ default: false })
  selectable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}

export default ServiceAddon;
