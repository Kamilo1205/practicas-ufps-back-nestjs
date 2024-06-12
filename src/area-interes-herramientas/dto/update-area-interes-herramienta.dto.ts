import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaInteresHerramientaDto } from './create-area-interes-herramienta.dto';

export class UpdateAreaInteresHerramientaDto extends PartialType(CreateAreaInteresHerramientaDto) {}
