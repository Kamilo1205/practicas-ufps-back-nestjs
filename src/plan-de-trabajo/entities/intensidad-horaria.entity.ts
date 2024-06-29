import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class IntensidadHoraria extends BaseEntity {
  @Column('boolean', { array: true })
  horario: boolean[][];

  @Column('int')
  cantidadSemanas: number;
}
