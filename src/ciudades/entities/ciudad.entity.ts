import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  nombre: string;
  
  @ManyToOne(() => Departamento, (departamento) => departamento.ciudades)
  departamento: Departamento;
  
  @OneToMany(() => Empresa, (empresa) => empresa.ciudad)
  empresas: Empresa[];

  @OneToMany(() => Empresa, (empresa) => empresa.ciudad)
  representantesLegales: RepresentanteLegal[];

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
