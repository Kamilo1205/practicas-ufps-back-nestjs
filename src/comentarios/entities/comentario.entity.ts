import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { Actividad } from 'src/actividades/entities/actividade.entity';
import { SubActividad } from 'src/sub-actividades/entities/sub-actividad.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Comentario extends BaseEntity {
  @Column({ type: 'text' })
  texto: string;

  @ManyToOne(() => Objetivo, objetivo => objetivo.comentarios, { nullable: true })
  objetivo: Objetivo;

  @ManyToOne(() => Actividad, actividad => actividad.comentarios, { nullable: true })
  actividad: Actividad;

  @ManyToOne(() => SubActividad, subActividad => subActividad.comentarios, { nullable: true })
  subActividad: SubActividad;

  @ManyToOne(() => Usuario, usuario => usuario.comentarios)
  autor: Usuario;
}
