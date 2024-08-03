import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { Actividad } from './actividad.entity';

@Entity()
export class SeccionActividades extends BaseEntity { 
  @OneToMany(() => Actividad, (actividad) => actividad.seccionActividades, { eager: true })
  actividades: Actividad[];
    
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.seccionActividades)
  planDeTrabajo: PlanDeTrabajo;
  
  @OneToMany(() => Comentario, (comentario) => comentario.seccionActividades, { eager: true })
  comentarios: Comentario[];
}