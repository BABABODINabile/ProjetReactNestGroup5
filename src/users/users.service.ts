import { Injectable, BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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


  async update(id: number, dto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findById(id);

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email déjà utilisé');
      }
      user.email = dto.email;
    }

    if (dto.firstname) {
      user.firstname = dto.firstname;
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role_id) {
      const role = await this.roleRepository.findOne({
        where: { id: dto.role_id },
      });
      if (!role) {
        throw new BadRequestException('Rôle invalide');
      }
      user.role = role;
    }

    if (dto.is_active !== undefined) {
      user.is_active = dto.is_active;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    // 1. Vérifier si l'ancien mot de passe est correct
    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Ancien mot de passe incorrect');
    }

    // 2. Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(dto.newPassword, salt);

    // 3. Sauvegarder
    await this.userRepository.save(user);
  }
}