import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaSubAreaInteresDto } from './create-area-sub-area-interes.dto';

export class UpdateAreaSubAreaInteresDto extends PartialType(CreateAreaSubAreaInteresDto) {}
