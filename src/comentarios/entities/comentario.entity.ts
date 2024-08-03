import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Objetivo } from 'src/objetivos/entities/objetivo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SeccionActividades } from 'src/actividades/entities/seccion-actividades.entity';

@Entity()
export class Comentario extends BaseEntity {
  @Column({ type: 'text' })
  comentario: string;

  @ManyToOne(() => Objetivo, objetivo => objetivo.comentarios, { nullable: true })
  objetivo: Objetivo;

  @ManyToOne(() => SeccionActividades, (seccionActividades) => seccionActividades.comentarios, { nullable: true })
  seccionActividades: SeccionActividades;

  @ManyToOne(() => Usuario, usuario => usuario.comentarios, { eager: true })
  autor: Usuario;
}
