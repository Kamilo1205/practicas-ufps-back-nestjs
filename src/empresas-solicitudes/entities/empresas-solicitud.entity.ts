import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';

@Entity()
export class EmpresaSolicitud {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Semestre, (semestre) => semestre.empresaSolicitudes)
  @JoinColumn()
  semestre: Semestre;

  @ManyToMany(() => Herramienta)
  @JoinColumn()
  herramientas: Herramienta[];

  @Column()
  cantidadEstudiantes: number;

  @Column()
  esRenumerado: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
