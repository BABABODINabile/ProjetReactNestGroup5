import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  file_name: string;

  @Column({ length: 255 })
  file_path: string;

  @Column({ length: 100 })
  mime_type: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.attachments, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;

  @CreateDateColumn()
  uploaded_at: Date;
}
