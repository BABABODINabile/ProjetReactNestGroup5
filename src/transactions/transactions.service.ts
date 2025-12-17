import {Injectable,NotFoundException,BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './dto/create-transaction.dto';
import { CategoryType } from 'src/categories/category-type.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateTransactionDto, user: User) {
  const category = await this.categoryRepository.findOne({
    where: { id: dto.category_id },
  });

  if (!category) {
    throw new NotFoundException('Catégorie introuvable');
  }

  if (
    category.type !== CategoryType.MIXTE &&
    category.type !== dto.type
  ) {
    throw new BadRequestException(
      'Type de transaction incompatible avec la catégorie',
    );
  }

  const transaction = this.transactionRepository.create({
    type: dto.type,
    category,
    amount: dto.amount,
    description: dto.description ?? null,
    transaction_date: dto.transaction_date
      ? new Date(dto.transaction_date)
      : new Date(),
    user,
  });

  return await this.transactionRepository.save(transaction);
}


  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: ['category', 'user'],
      order: { transaction_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['category', 'user'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction introuvable');
    }

    return transaction;
  }

  async remove(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Transaction introuvable');
    }
  }
}
