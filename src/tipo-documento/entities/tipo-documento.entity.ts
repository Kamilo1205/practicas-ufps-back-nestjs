import { Entity, Column, OneToMany } from 'typeorm';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class TipoDocumento extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => RepresentanteLegal, (representanteLegal) => representanteLegal.TipoDocumento)
  representantesLegales: RepresentanteLegal[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.tipoDocumento)
  estudiantes: Estudiante[];
}
