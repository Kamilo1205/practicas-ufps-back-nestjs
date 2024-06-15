import { Column, Entity, OneToMany } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Eps extends BaseEntity{
  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  nit: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.eps)
  estudiantes: Estudiante[];
}
