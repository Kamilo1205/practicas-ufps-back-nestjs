import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class EvaluacionEstudiante extends BaseEntity {
  @Column('json')
  procesoDeGestion: boolean[][];
  
  @Column('json')
  jefeInmediato: boolean[][];
  
  @Column('json')
  empresa: boolean[][];
  
  @Column('json')
  aporteRealizacion: boolean[][]
  
  @Column('json')
  comentarios:string
}