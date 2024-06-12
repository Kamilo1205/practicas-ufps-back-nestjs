import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteAreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nivelInteres: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.estudianteAreaInteres, { onDelete: 'CASCADE' })
  estudiante: Estudiante;

  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.estudianteAreaInteres, { onDelete: 'CASCADE' })
  areaInteres: AreaInteres;
}
