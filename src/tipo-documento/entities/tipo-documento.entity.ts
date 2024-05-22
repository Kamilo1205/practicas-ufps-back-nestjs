import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';
import { Transform } from 'class-transformer';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity()
export class TipoDocumento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn({ type: 'date' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'date' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ type: 'date' })
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;

  // Relaciones
  @OneToMany(() => RepresentanteLegal, (representanteLegal) => representanteLegal.TipoDocumento)
  representantesLegales: RepresentanteLegal[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.tipoDocumento)
  estudiantes: Estudiante[];
}
