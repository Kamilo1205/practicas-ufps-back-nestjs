/* import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividad } from './actividad.entity';
import { SubActividad } from './sub-actividades.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';

@Entity()
export class Comentario extends BaseEntity {
  @Column({ type: 'text' })
  contenido: string;

  //@ManyToOne(() => Usuario, (usuario) => usuario.comentarios, { onDelete: 'CASCADE' })
  //autor: Usuario;

  //@ManyToOne(() => Objetivo, (objetivo) => objetivo.comentarios)
  //objetivo: Objetivo;

  //@ManyToOne(() => Actividad, (actividad) => actividad.comentarios)
  //actividad: Actividad;

  //@ManyToOne(() => SubActividad, (subActividad) => subActividad.comentarios)
  //subActividad: SubActividad;
} */