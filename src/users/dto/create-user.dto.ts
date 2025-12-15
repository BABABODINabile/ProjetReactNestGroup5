import { Type } from 'class-transformer';
import {IsEmail,IsNotEmpty,IsString,MinLength,IsBoolean,IsOptional,IsInt} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({message: 'Le nom est obligatoire'})
  firstname: string;

  @IsString()
  @IsNotEmpty({message: 'Le prénom est obligatoire'})
  name: string;

  @IsEmail()
  @IsNotEmpty({message: 'L\'email est obligatoire'})
  email: string;

  @IsString()
  @MinLength(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'})
  @IsNotEmpty({message: 'Le mot de passe est obligatoire'})
  password: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
