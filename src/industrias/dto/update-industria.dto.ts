import { PartialType } from '@nestjs/mapped-types';
import { CreateIndustriaDto } from './create-industria.dto';

export class UpdateIndustriaDto extends PartialType(CreateIndustriaDto) {}
