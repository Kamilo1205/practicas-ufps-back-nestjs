import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class IntensidadHoraria extends BaseEntity {
  @Column('boolean', { array: true })
  horario: boolean[][];

  @Column('int')
  cantidadSemanas: number;

  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.intensidadHoraria)
  planDeTrabajo: PlanDeTrabajo;
}