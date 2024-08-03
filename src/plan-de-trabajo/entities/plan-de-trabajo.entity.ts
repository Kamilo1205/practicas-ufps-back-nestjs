import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { IntensidadHoraria } from 'src/intensidad-horaria/entities/intensidad-horaria.entity';
import { SeccionActividades } from 'src/actividades/entities/seccion-actividades.entity';

@Entity()
export class PlanDeTrabajo extends BaseEntity {
  @OneToOne(() => Objetivo, (objetivo) => objetivo.planDeTrabajo, { eager: true })
  @JoinColumn()
  objetivo: Objetivo;

  @OneToOne(() => SeccionActividades, (seccionActividades) => seccionActividades.planDeTrabajo, { eager: true })
  @JoinColumn()
  seccionActividades: SeccionActividades;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.planesDeTrabajo, { eager: true })
  estudiante: Estudiante;

  @OneToOne(() => IntensidadHoraria, (intensidadHoraria) => intensidadHoraria.planDeTrabajo , { cascade: true, eager: true })
  @JoinColumn()
  intensidadHoraria: IntensidadHoraria;

  @ManyToOne(() => Semestre, (semestre) => semestre.planesDeTrabajo, { eager: true })
  semestre: Semestre;
}
