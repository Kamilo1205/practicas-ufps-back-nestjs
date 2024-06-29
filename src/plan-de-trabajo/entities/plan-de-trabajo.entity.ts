import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IntensidadHoraria } from './intensidad-horaria.entity';

@Entity()
export class PlanDeTrabajo extends BaseEntity {
  @Column({ type: 'text' })
  objetivoPractica: string;

  @Column({ type: 'text' })
  objetivoPrincipal: string;

  @Column({ type: 'text' })
  objetivoEspecial: string;
  
  @Column({ type: 'text' })
  justificacion: string;
  
  @Column({ type: 'text' })
  alcance: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.planesDeTrabajo)
  estudiante: Estudiante;

  @OneToOne(() => IntensidadHoraria, { cascade: true })
  @JoinColumn()
  intensidadHorario: IntensidadHoraria;
}
