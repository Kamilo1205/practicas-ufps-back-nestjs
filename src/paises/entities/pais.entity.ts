import { Column, Entity, OneToMany } from 'typeorm';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Pais extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Departamento, (departamento) => departamento.pais)
  departamentos: Departamento[];
}
