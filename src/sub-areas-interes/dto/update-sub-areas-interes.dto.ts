import { PartialType } from '@nestjs/mapped-types';
import { CreateSubAreasInteresDto } from './create-sub-areas-interes.dto';

export class UpdateSubAreasInteresDto extends PartialType(CreateSubAreasInteresDto) {}
