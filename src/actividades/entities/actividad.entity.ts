import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { SubActividad } from 'src/sub-actividades/entities/sub-actividad.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { SeccionActividades } from './seccion-actividades.entity';

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

  @Column({ type: 'text', nullable: true })
  estrategiaDesarrollo: string;

  @Column({ type: 'text', nullable: true })
  recursosUtilizados: string;

  @Column({ type: 'text', nullable: true })
  resultadosObtenidos: string;

  @Column({ type: 'text', nullable: true })
  impactosPercibidos: string;

  @Column({ type: 'text', nullable: true })
  limitaciones: string;

  @OneToMany(() => SubActividad, (subActividad) => subActividad.actividad, { eager: true })
  subActividades: SubActividad[];

  @ManyToOne(() => SeccionActividades, (seccionActividades) => seccionActividades.actividades)
  seccionActividades: SeccionActividades;
}