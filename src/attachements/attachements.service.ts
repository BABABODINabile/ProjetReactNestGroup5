import { Injectable } from '@nestjs/common';
import { CreateAttachementDto } from './dto/create-attachement.dto';
import { UpdateAttachementDto } from './dto/update-attachement.dto';

@Injectable()
export class AttachementsService {
  create(createAttachementDto: CreateAttachementDto) {
    return 'This action adds a new attachement';
  }

  findAll() {
    return `This action returns all attachements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachement`;
  }

  update(id: number, updateAttachementDto: UpdateAttachementDto) {
    return `This action updates a #${id} attachement`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachement`;
  }
}
