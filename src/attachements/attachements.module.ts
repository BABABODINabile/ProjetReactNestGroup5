import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachement.entity';
import { AttachementsService } from './attachements.service';
import { AttachementsController } from './attachements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  controllers: [AttachementsController],
  providers: [AttachementsService],
})
export class AttachementsModule {}
