import {Controller,Get,Post,Patch,Body,Param,Delete,UseGuards,Req,Query} from '@nestjs/common';
import type { Request } from 'express';
import type { AuthRequest } from '../auth/auth-request.interface';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { JwtAuthGuard} from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/entities/user.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur','Comptable') // 🔐 accès Directeur et Comptable
  @Post()
  async create(
    @Body() dto: CreateTransactionDto,
    @Req() req: Request,
  ) {
    return this.transactionsService.create(dto, req.user as User);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur','Comptable') // 🔐 accès Directeur et Comptable
  @Get()
  async findAll(@Query() query: any) {
    // query contiendra { page, limit, type, etc. }
    return this.transactionsService.findAll(query);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur') // 🔐 accès Directeur uniquement
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateTransactionDto>,
  ) {
    return this.transactionsService.update(+id, dto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur') // 🔐 accès Directeur uniquement
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur','Comptable') // 🔐 accès Directeur et Comptable
  @Get('stats')
  async getStats(
    @Query('month') month: string,
    @Query('year') year: string,
    @Req() req: AuthRequest,
  ) {
    return this.transactionsService.getStats(month, year, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Directeur','Comptable') // 🔐 accès Directeur et Comptable
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }


}
