import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { SubActividad } from 'src/sub-actividades/entities/sub-actividad.entity';

@Entity()
export class Actividad extends BaseEntity {
  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechaInicio: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechFin: Date;

  @Column({ type: 'text', default: '0' })
  totalHoras: string;

  @Column({ type: 'text', default: '0' })
  porcentajeCompletado: string;

  @ManyToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.actividades)
  planDeTrabajo: PlanDeTrabajo;

  @OneToMany(() => SubActividad, (subActividad) => subActividad.actividad)
  subActividades: SubActividad[];

  //@OneToMany(() => Comentario, (comentario) => comentario.actividad)
  //comentarios: Comentario[];
}