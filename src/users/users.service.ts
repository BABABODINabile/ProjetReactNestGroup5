import { Injectable, BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1️⃣ Vérifier si email existe déjà
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }

    // 2️⃣ Vérifier si le rôle existe
    const role = await this.roleRepository.findOne({
      where: { id: createUserDto.role_id },
    });

    if (!role) {
      throw new BadRequestException('Rôle invalide');
    }

    // 3️⃣ Hash du mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 4️⃣ Création de l'utilisateur
    const user = this.userRepository.create({
      firstname: createUserDto.firstname,
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: role,
      is_active: createUserDto.is_active ?? true,
    });

    // 5️⃣ Sauvegarde
    return await this.userRepository.save(user);
  }

  async findAll(){
    return this.userRepository.find();
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findById(id: number): Promise<User> {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: ['role'],
  });

  if (!user) {
    throw new NotFoundException('Utilisateur introuvable');
  }

  return user;
}
}
