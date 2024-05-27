import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Anio } from 'src/anio/entities/anio.entity';
import { Transform } from 'class-transformer';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity()
export class Semestre {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Anio, (anio) => anio.semestres)
  anio: Anio;
  
  @Column()
  semestre: number;
  
  @Column()
  googleDriveFolderId: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ nullable: true })
  fechaInicioPlanDeTrabajo: Date;

  @Column({ nullable: true })
  fechaFinPlanDeTrabajo: Date;

  @Column({ nullable: true })
  fechaInicioPrimerInforme: Date;

  @Column({ nullable: true })
  fechaFinPrimerInforme: Date;

  @Column({ nullable: true })
  fechaInicioInformeFinal: Date;

  @Column({ nullable: true })
  fechaFinInformeFinal: Date;

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.semestres)
  estudiantes: Estudiante[];

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
