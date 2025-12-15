import {Body,Controller,Get,Post,Param,ParseIntPipe,UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Directeur')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Créer un utilisateur
   * POST /users
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * (Optionnel pour plus tard)
   * GET /users
   * Liste des utilisateurs
   */
  @Get()
  async findAll(): Promise<User[]> {
    // On implémentera plus tard la pagination / rôles
    return [];
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  return this.usersService.findById(id);
  }
  
}