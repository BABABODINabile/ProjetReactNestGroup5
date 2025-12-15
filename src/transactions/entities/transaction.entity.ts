import { User } from 'src/users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Attachment } from '../../attachements/entities/attachement.entity';
import {Column,Entity,ManyToOne,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm';
import { TransactionType } from '../transaction-type.enum';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @ManyToOne(() => Category, (category) => category.transactions, {
    nullable: false,
    eager: true,
  })
  category: Category;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'date' })
  transaction_date: Date;

  @ManyToOne(() => User, (user) => user.transactions, { eager: true })
  createdBy: User;

  @OneToMany(() => Attachment, (attachment) => attachment.transaction)
  attachments: Attachment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
