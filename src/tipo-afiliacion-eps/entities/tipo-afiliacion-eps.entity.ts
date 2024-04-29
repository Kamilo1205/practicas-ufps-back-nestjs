import { EstudianteEps } from 'src/estudiante-eps/entities/estudiante-eps.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoAfiliacionEps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  // Relaciones
  @OneToMany(() => EstudianteEps, (estudianteEps) => estudianteEps.tipoAfiliacion)
  estudiantes: EstudianteEps;
}
