import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { EmpresaSolicitud } from 'src/empresas-solicitudes/entities/empresas-solicitud.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';

@Entity()
export class Asignacion extends BaseEntity {
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asignaciones)
  estudiante: Estudiante;
  
  @ManyToOne(() => EmpresaSolicitud, (empresaSolicitud) => empresaSolicitud.asignaciones)
  solicitud: EmpresaSolicitud;
  
  @ManyToOne(() => Tutor, (tutor) => tutor.asignaciones)
  tutor: Tutor;

  @Column()
  estado: string;
}
