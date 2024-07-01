/* import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from './plan-de-trabajo.entity';
import { SubActividad } from './sub-actividades.entity';
import { Comentario } from './comentario.entity';

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

  //@ManyToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.actividades)
  //planDeTrabajo: PlanDeTrabajo;

  //@OneToMany(() => SubActividad, (subActividad) => subActividad.actividad)
  //subActividades: SubActividad[];

  //@OneToMany(() => Comentario, (comentario) => comentario.actividad)
  //comentarios: Comentario[];
} */