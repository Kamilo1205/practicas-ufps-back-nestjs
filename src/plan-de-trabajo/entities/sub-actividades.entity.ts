import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class SubActividad extends BaseEntity {
  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechFin: Date;

  @Column()
  totalHoras: number;

  @Column()
  porcentajeCompletado: number;

  //@ManyToOne(() => Actividad, (actividad) => actividad.subActividades)
  //actividad: Actividad;

  //@OneToMany(() => Comentario, (comentario) => comentario.actividad)
  //comentarios: Comentario[];
}