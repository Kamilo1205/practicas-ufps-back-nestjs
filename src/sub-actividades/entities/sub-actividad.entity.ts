import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Actividad } from 'src/actividades/entities/actividade.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';

@Entity()
export class SubActividad extends BaseEntity {
  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechaInicio: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechFin: Date;

  @Column({ type: 'text', default: '0' })
  totalHoras: string;

  @Column({ type: 'text', default: '0' })
  porcentajeCompletado: string;

  @ManyToOne(() => Actividad, (actividad) => actividad.subActividades)
  actividad: Actividad;

  @OneToMany(() => Comentario, (comentario) => comentario.actividad)
  comentarios: Comentario[];
}
