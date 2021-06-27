import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Statistic;
