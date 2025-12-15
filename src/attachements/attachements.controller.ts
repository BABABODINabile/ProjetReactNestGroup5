import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachementsService } from './attachements.service';
import { CreateAttachementDto } from './dto/create-attachement.dto';
import { UpdateAttachementDto } from './dto/update-attachement.dto';

@Controller('attachements')
export class AttachementsController {
  constructor(private readonly attachementsService: AttachementsService) {}

  @Post()
  create(@Body() createAttachementDto: CreateAttachementDto) {
    return this.attachementsService.create(createAttachementDto);
  }

  @Get()
  findAll() {
    return this.attachementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachementDto: UpdateAttachementDto) {
    return this.attachementsService.update(+id, updateAttachementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachementsService.remove(+id);
  }
}
