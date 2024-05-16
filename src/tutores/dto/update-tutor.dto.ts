import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoreDto } from './create-tutor.dto';

export class UpdateTutoreDto extends PartialType(CreateTutoreDto) {}
