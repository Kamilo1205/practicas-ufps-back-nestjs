import { OmitType } from '@nestjs/mapped-types';
import { CreateSemestreDto } from './create-semestre.dto';

export class UpdateSemestreDto extends OmitType(CreateSemestreDto, ['anioId', 'semestre']) {}
