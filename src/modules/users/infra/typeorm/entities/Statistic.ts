import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from './User';

@Entity('statistics')
class Statistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  favorites: number;

  @Column({ nullable: true })
  reviews: number;

  @Column({ default: 0 })
  average_review: number;
  // CONSTRAINTS

  @OneToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Statistic;
