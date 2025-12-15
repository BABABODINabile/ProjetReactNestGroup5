import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,OneToMany,UpdateDateColumn} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { CategoryType } from '../category-type.enum';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type: CategoryType;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
