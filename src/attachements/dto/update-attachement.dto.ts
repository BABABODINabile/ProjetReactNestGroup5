import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachementDto } from './create-attachement.dto';

export class UpdateAttachementDto extends PartialType(CreateAttachementDto) {}
