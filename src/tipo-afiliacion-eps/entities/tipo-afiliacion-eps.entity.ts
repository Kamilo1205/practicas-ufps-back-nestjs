import { Column, Entity, OneToMany } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class TipoAfiliacionEps extends BaseEntity {
  @Column()
  nombre: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.tipoAfiliacionEps)
  estudiantes: Estudiante[];
}
