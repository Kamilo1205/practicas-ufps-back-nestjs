import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDeTrabajoDto } from './create-plan-de-trabajo.dto';

export class UpdatePlanDeTrabajoDto extends PartialType(CreatePlanDeTrabajoDto) {}
