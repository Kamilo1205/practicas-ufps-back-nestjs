import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';

@Entity()
export class Objetivo extends BaseEntity {
  @Column({ type: 'text' })
  objetivoPractica: string;
  
  @Column({ type: 'text' })
  objetivoPrincipal: string;
  
  @Column({ type: 'text' })
  objetivoEspecial: string;
  
  @Column({ type: 'text' })
  justificacion: string;
  
  @Column({ type: 'text' })
  alcance: string;

  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.objetivo)
  planDeTrabajo: PlanDeTrabajo;

  @OneToMany(() => Comentario, (comentario) => comentario.objetivo, { eager: true })
  comentarios: Comentario[];
}