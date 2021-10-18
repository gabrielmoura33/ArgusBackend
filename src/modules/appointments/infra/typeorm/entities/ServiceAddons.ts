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
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true, type: 'float' })
  min_value: number;

  @Column({ nullable: true, type: 'float' })
  max_value: number;

  @Column({ default: false })
  default: boolean;

  @Column({ default: false })
  active: boolean;

  @Column()
  type: 'PUBLIC' | 'DURATION' | 'EQUIPMENT' | 'AMBIENT';

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
