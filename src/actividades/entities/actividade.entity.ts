import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class Actividad extends BaseEntity {
  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechFin: Date;

  @Column()
  totalHoras: number;

  @Column()
  porcentajeCompletado: number;

  @ManyToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.actividades)
  planDeTrabajo: PlanDeTrabajo;

  //@OneToMany(() => SubActividad, (subActividad) => subActividad.actividad)
  //subActividades: SubActividad[];
//
  //@OneToMany(() => Comentario, (comentario) => comentario.actividad)
  //comentarios: Comentario[];
}