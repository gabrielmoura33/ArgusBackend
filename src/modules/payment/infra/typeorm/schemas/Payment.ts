import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('payments')
class Payment {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid', { nullable: false })
  provider_id: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @Column('uuid', { nullable: false })
  appointment_id: string;

  @Column()
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'BILLET' | 'PIX';

  @Column({ default: false })
  status: 'ON HOLD' | 'SUCCESS' | 'CANCELED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Payment;
