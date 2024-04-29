import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { TipoAfiliacionEps } from 'src/tipo-afiliacion-eps/entities/tipo-afiliacion-eps.entity';

@Entity()
export class EstudianteEps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.eps)
  @JoinColumn()
  estudiante: Estudiante;

  @ManyToOne(() => Eps, (eps) => eps.estudiantes)
  @JoinColumn()
  eps: Eps;

  @ManyToOne(() => TipoAfiliacionEps, (tipoAfiliacion) => tipoAfiliacion.estudiantes)
  tipoAfiliacion: TipoAfiliacionEps;

  @Column()
  fechaAfiliacion: Date;

  @Column()
  documentoAfiliacionUrl: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;
}
