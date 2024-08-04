import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { EmpresaSolicitud } from 'src/empresas-solicitudes/entities/empresas-solicitud.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class Asignacion extends BaseEntity {
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asignaciones)
  estudiante: Estudiante;
  
  @ManyToOne(() => EmpresaSolicitud, (empresaSolicitud) => empresaSolicitud.asignaciones)
  solicitud: EmpresaSolicitud;
  
  @ManyToOne(() => Tutor, (tutor) => tutor.asignaciones, { eager: true })
  tutor: Tutor;

  @JoinColumn()
  @OneToOne(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.asignacion, { eager: true })
  planDeTrabajo: PlanDeTrabajo;

  @Column()
  estado: string;
}
