import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class Informe extends BaseEntity {
  @Column()
  adaptacion: string;

  @Column()
  tolerancia: string;

  @Column()
  nuevasResponsabilidades: string;

  @Column()
  compromisoEficiencia: string;

  @Column()
  conclusion: string; 
  
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.primerInforme)
  primerInforme: PlanDeTrabajo;
  
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.primerInforme)
  informeFinal: PlanDeTrabajo;
}
