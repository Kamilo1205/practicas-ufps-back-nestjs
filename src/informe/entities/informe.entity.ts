import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { TutorInstitucional } from 'src/tutor-institucional/entities/tutor-institucional.entity';

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

  @Column()
  fueronAsumidas: string;
  
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.primerInforme)
  primerInforme: PlanDeTrabajo;
  
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.primerInforme)
  informeFinal: PlanDeTrabajo;

  @ManyToOne(() => TutorInstitucional, (tutor) => tutor.informesAprobados)
  tutorInstitucionalAprobo: TutorInstitucional;

  @ManyToOne(() => Tutor, (tutor) => tutor.informesAprobados)
  tutorEmpresarialAprobo: Tutor;
}
