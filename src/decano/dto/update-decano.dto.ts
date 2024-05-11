import { PartialType } from '@nestjs/mapped-types';
import { CreateDecanoDto } from './create-decano.dto';

export class UpdateDecanoDto extends PartialType(CreateDecanoDto) {}
