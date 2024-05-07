import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstudianteEps } from 'src/estudiante-eps/entities/estudiante-eps.entity';

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
