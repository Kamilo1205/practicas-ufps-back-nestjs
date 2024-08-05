import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from './plan-de-trabajo.entity';

@Entity()
export class Resultado extends BaseEntity {
  @Column()
  resultado: string;

  @Column()
  indicador: string;

  @ManyToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.resultados)
  planDeTrabajo: PlanDeTrabajo;
}