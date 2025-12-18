import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
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


  async findAll(query: any) {
      const { page = 1, limit = 10, type, categoryId, search } = query;
      const skip = (page - 1) * limit;

      const queryBuilder = this.transactionRepository.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.category', 'category')
        .leftJoinAndSelect('transaction.user', 'user');

      // --- Filtres dynamiques ---
      if (type) {
        queryBuilder.andWhere('transaction.type = :type', { type });
      }

      if (categoryId) {
        queryBuilder.andWhere('category.id = :categoryId', { categoryId });
      }

      if (search) {
        queryBuilder.andWhere('transaction.description LIKE :search', { search: `%${search}%` });
      }

      // --- Pagination et Tri ---
      queryBuilder
        .orderBy('transaction.transaction_date', 'DESC')
        .skip(skip)
        .take(limit);

      const [data, total] = await queryBuilder.getManyAndCount();

      return {
        data,
        total,
        page: +page,
        lastPage: Math.ceil(total / limit),
      };
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


    async update(id: number, dto: Partial<CreateTransactionDto>) {
    // 1. Vérifier l'existence
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction introuvable');
    }

    // 2. Si on change de catégorie ou de type, on re-vérifie la cohérence métier
    if (dto.category_id || dto.type) {
      const categoryId = dto.category_id || transaction.category.id;
      const type = dto.type || transaction.type;

      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      
      if (!category) throw new NotFoundException('Catégorie introuvable');

      if (category.type !== CategoryType.MIXTE && category.type !== type) {
        throw new BadRequestException('Type de transaction incompatible avec la catégorie');
      }
      
      transaction.category = category;
      transaction.type = type;
    }

    // 3. Mise à jour des autres champs
    if (dto.amount) transaction.amount = dto.amount;
    if (dto.description !== undefined) transaction.description = dto.description;
    if (dto.transaction_date) transaction.transaction_date = new Date(dto.transaction_date);

    return await this.transactionRepository.save(transaction);
  }


  async remove(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Transaction introuvable');
    }
  }
}
