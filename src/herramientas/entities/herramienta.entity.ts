import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AreaInteresHerramienta } from 'src/area-interes-herramientas/entities/area-interes-herramienta.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Herramienta extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => AreaInteresHerramienta, (areaInteresHerramienta) => areaInteresHerramienta.herramienta)
  areainteresHerramientas: AreaInteresHerramienta[];

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.herramientas)
  estudiantes: Estudiante[];
}
