import {Controller,Get,Post,Patch,Body,Param,Delete,UseGuards,Req,Query} from '@nestjs/common';
import type { Request } from 'express';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../users/entities/user.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Directeur') // 🔐 accès Directeur uniquement
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() dto: CreateTransactionDto,
    @Req() req: Request,
  ) {
    return this.transactionsService.create(dto, req.user as User);
  }

  @Get()
  async findAll(@Query() query: any) {
    // query contiendra { page, limit, type, etc. }
    return this.transactionsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateTransactionDto>,
  ) {
    return this.transactionsService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
