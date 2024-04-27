import { PartialType } from '@nestjs/mapped-types';
import { CreateEpsDto } from './create-eps.dto';

export class UpdateEpsDto extends PartialType(CreateEpsDto) {}
