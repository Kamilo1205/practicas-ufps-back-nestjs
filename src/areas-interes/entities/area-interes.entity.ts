import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { EstudianteAreaInteres } from 'src/estudiante-area-interes/entities/estudiante-area-interes.entity';
import { AreaInteresHerramienta } from 'src/area-interes-herramientas/entities/area-interes-herramienta.entity';

@Entity()
export class AreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
