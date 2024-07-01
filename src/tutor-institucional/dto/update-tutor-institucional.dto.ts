import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorInstitucionalDto } from './create-tutor-institucional.dto';

export class UpdateTutorInstitucionalDto extends PartialType(CreateTutorInstitucionalDto) {}
