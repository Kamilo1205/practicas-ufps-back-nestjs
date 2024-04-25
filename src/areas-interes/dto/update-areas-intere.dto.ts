import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaInteresDto } from './create-area-interes.dto';

export class UpdateAreaInteresDto extends PartialType(CreateAreaInteresDto) {}
