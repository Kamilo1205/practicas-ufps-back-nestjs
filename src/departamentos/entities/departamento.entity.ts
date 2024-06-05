import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Pais } from 'src/paises/entities/pais.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  nombre: string;
  
  @ManyToOne(() => Pais, (pais) => pais.departamentos)
  pais: Pais;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.departamento)
  ciudades: Ciudad[];

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
