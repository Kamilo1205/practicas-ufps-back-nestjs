import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Ciudad extends BaseEntity {
  @Column({ unique: true })
  nombre: string;
  
  @ManyToOne(() => Departamento, (departamento) => departamento.ciudades)
  departamento: Departamento;
  
  @OneToMany(() => Empresa, (empresa) => empresa.ciudad)
  empresas: Empresa[];

  @OneToMany(() => Empresa, (empresa) => empresa.ciudad)
  representantesLegales: RepresentanteLegal[];
}
