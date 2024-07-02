import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { Actividad } from 'src/actividades/entities/actividade.entity';
import { SubActividad } from 'src/sub-actividades/entities/sub-actividad.entity';

@Entity()
export class Comentario extends BaseEntity {
  @Column({ type: 'text' })
  contenido: string;

  @ManyToOne(() => Objetivo, objetivo => objetivo.comentarios, { nullable: true })
  objetivo: Objetivo;

  @ManyToOne(() => Actividad, actividad => actividad.comentarios, { nullable: true })
  actividad: Actividad;

  @ManyToOne(() => SubActividad, subActividad => subActividad.comentarios, { nullable: true })
  subActividad: SubActividad;
}
