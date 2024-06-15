import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EstudianteAreaInteres } from 'src/estudiante-area-interes/entities/estudiante-area-interes.entity';
import { AreaInteresHerramienta } from 'src/area-interes-herramientas/entities/area-interes-herramienta.entity';
import { EmpresaSolicitudesAreaInteres } from 'src/empresas-solicitudes-areas-interes/entities/empresas-solicitudes-areas-intere.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class AreaInteres extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => EstudianteAreaInteres, (estudianteAreaInteres) => estudianteAreaInteres.areaInteres)
  estudianteAreaInteres: EstudianteAreaInteres[];

  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.subAreas)
  areaPadre: AreaInteres;

  @OneToMany(() => AreaInteres, (areaInteres) => areaInteres.areaPadre)
  subAreas: AreaInteres[];

  @OneToMany(() => AreaInteresHerramienta, (areaInteresHerramienta) => areaInteresHerramienta.areaInteres)
  areaInteresHerramientas: AreaInteresHerramienta[];

  @OneToMany(() => EmpresaSolicitudesAreaInteres, (empresaSolicitudesAreaInteres) => empresaSolicitudesAreaInteres.areaInteres)
  empresaSolicitudAreaInteres: EmpresaSolicitudesAreaInteres;
}
