import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Anio } from 'src/anio/entities/anio.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { EmpresaSolicitud } from 'src/empresas-solicitudes/entities/empresas-solicitud.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class Semestre extends BaseEntity{
  @ManyToOne(() => Anio, (anio) => anio.semestres)
  @JoinColumn()
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

  @OneToMany(() => EmpresaSolicitud, (empresaSolicitud) => empresaSolicitud.semestre)
  empresaSolicitudes: EmpresaSolicitud[];

  @OneToMany(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.semestre)
  planesDeTrabajo: PlanDeTrabajo[];
}
