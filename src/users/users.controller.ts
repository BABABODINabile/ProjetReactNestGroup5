import {Body,Controller,Get,Post,Delete,Patch, Param,ParseIntPipe,UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request } from '@nestjs/common';

import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Créer un utilisateur
   * POST /users
   * --- PUBLIC pour permettre la création initiale (seed)
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * GET /users
   * Liste des utilisateurs (protégé : Directeur)
   */
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('Directeur')
  @Get()
  async findAll(): Promise<User[]> {
    // On implémentera plus tard la pagination / rôles
    return this.usersService.findAll();
  }


  /**
   * GET /users/:id (protégé : Directeur)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  /**
   * PATCH /users/id (protégé :Directeur)
   */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Directeur')
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: Partial<CreateUserDto>,
    ): Promise<User> {
      return this.usersService.update(id, dto);
    } 

  /**
   * Delete/users/id (protégé :Directeur)
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }


  /**
   * PATCH /users/profile
   * Permet à l'utilisateur connecté de modifier ses propres infos
   */
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Request() req, // Récupère l'utilisateur via le JWT
    @Body() dto: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.usersService.update(req.user.id, dto);
  }

  /**
   * POST /users/change-password
   * Pour changer le mot de passe
   */
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() dto: ChangePasswordDto, // Créez ce DTO simple
  ): Promise<{ message: string }> {
    await this.usersService.changePassword(req.user.id, dto);
    return { message: 'Mot de passe mis à jour avec succès' };
  }
}