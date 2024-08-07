import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { IntensidadHoraria } from 'src/intensidad-horaria/entities/intensidad-horaria.entity';
import { SeccionActividades } from 'src/actividades/entities/seccion-actividades.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { TutorInstitucional } from 'src/tutor-institucional/entities/tutor-institucional.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { Informe } from 'src/informe/entities/informe.entity';
import { EvaluacionEstudiante } from 'src/evaluacion-estudiante/entities/evaluacion-estudiante.entity';

@Entity()
export class PlanDeTrabajo extends BaseEntity {
  @OneToOne(() => Objetivo, (objetivo) => objetivo.planDeTrabajo, { eager: true })
  @JoinColumn()
  objetivo: Objetivo;

  @OneToOne(() => SeccionActividades, (seccionActividades) => seccionActividades.planDeTrabajo, { eager: true })
  @JoinColumn()
  seccionActividades: SeccionActividades;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.planesDeTrabajo)
  estudiante: Estudiante;

  @ManyToOne(() => Tutor)
  tutorEmpresarial?: Tutor;

  @ManyToOne(() => TutorInstitucional)
  tutorInstitucional?: TutorInstitucional;

  @OneToOne(() => IntensidadHoraria, (intensidadHoraria) => intensidadHoraria.planDeTrabajo , { cascade: true, eager: true })
  @JoinColumn()
  intensidadHoraria: IntensidadHoraria;

  @ManyToOne(() => Semestre, (semestre) => semestre.planesDeTrabajo, { eager: true })
  semestre: Semestre;

  @OneToOne(() => Asignacion, (asignacion) => asignacion.planDeTrabajo)
  asignacion: Asignacion;

  @Column({ nullable: true })
  requerimientosTecnicos: string;

  @Column({ type: 'json', nullable: true })
  resultados: { resultado: string; indicador: string }[];

  @OneToOne(() => Informe, (informe) => informe.primerInforme, { eager: true })
  @JoinColumn()
  primerInforme: Informe;
  
  @OneToOne(() => Informe, (informe) => informe.informeFinal, { eager: true })
  @JoinColumn()
  informeFinal: Informe;

  @OneToOne(() => EvaluacionEstudiante, { eager: true })
  @JoinColumn()
  evaluacion: EvaluacionEstudiante;
}
