import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteAreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.areasInteres)
  @JoinColumn()
  estudiante: Estudiante;

  @ManyToOne(() => AreaInteres, areaInteres => areaInteres.estudiantes)
  @JoinColumn()
  areaInteres: AreaInteres;

  @Column({ default: 1 })
  nivelInteres: number;
}
