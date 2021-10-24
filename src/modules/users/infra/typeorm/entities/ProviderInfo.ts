import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('provider_info')
class PrviderInfo {
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

  @Column()
  work_schedule: string;

  @Column()
  week_schedule: string;

  @Column({ nullable: true })
  video_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default PrviderInfo;
