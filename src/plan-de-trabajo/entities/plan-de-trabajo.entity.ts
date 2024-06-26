import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { Actividad } from 'src/actividades/entities/actividade.entity';
import { IntensidadHoraria } from 'src/intensidad-horaria/entities/intensidad-horaria.entity';

@Entity()
export class PlanDeTrabajo extends BaseEntity {
  @OneToOne(() => Objetivo, (objetivo) => objetivo.planDeTrabajo)
  @JoinColumn()
  objetivo: Objetivo;

  @OneToMany(() => Actividad, (actividad) => actividad.planDeTrabajo)
  actividades: Actividad[];

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.planesDeTrabajo)
  estudiante: Estudiante;

  @OneToOne(() => IntensidadHoraria, (intensidadHoraria) => intensidadHoraria.planDeTrabajo , { cascade: true })
  @JoinColumn()
  intensidadHoraria: IntensidadHoraria;

  @ManyToOne(() => Semestre, (semestre) => semestre.planesDeTrabajo)
  semestre: Semestre;
}
