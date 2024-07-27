import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Entity()
export class EmpresaSolicitud extends BaseEntity{
  @ManyToOne(() => Empresa, (empresa) => empresa.solicitudes)
  empresa: Empresa;

  @ManyToOne(() => Semestre, (semestre) => semestre.empresaSolicitudes)
  @JoinColumn()
  semestre: Semestre;

  @ManyToMany(() => Herramienta)
  @JoinTable()
  herramientas: Herramienta[];

  @ManyToMany(() => AreaInteres)
  @JoinTable()
  areasInteres: AreaInteres[];

  @Column()
  cantidadPracticantes: number;

  @Column()
  esRenumerado: string;

  @OneToMany(() => Asignacion, (asignaciones) => asignaciones.solicitud)
  asignaciones: Asignacion;
}
