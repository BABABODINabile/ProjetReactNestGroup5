import {IsEnum,IsNotEmpty,IsNumber,IsOptional,IsPositive,IsString,IsDateString,} from 'class-validator';
import { CategoryType } from 'src/categories/category-type.enum';

export enum TransactionType {
  RECETTE = 'Recette',
  DEPENSE = 'Dépense',
    MIXTE = 'Mixte',
}

export class CreateTransactionDto {
  @IsEnum(CategoryType)
  @IsNotEmpty()
  type: CategoryType;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  transaction_date?: string;
}
