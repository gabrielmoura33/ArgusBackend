import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('comments')
class Comment {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid', { nullable: false })
  provider_id: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @Column('uuid', { nullable: false })
  appointment_id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
