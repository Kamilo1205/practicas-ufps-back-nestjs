import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';

@Entity()
export class Pais {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Departamento, (departamento) => departamento.pais)
  departamentos: Departamento[];
 
  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
