import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Pais } from 'src/paises/entities/pais.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Departamento extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true, unique: true })
  codigoGubernamental: string;
  
  @ManyToOne(() => Pais, (pais) => pais.departamentos)
  pais: Pais;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.departamento)
  ciudades: Ciudad[];
}
