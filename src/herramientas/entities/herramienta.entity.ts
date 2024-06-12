import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaInteresHerramienta } from 'src/area-interes-herramientas/entities/area-interes-herramienta.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity()
export class Herramienta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => AreaInteresHerramienta, (areaInteresHerramienta) => areaInteresHerramienta.herramienta)
  areainteresHerramientas: AreaInteresHerramienta[];

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.herramientas)
  estudiantes: Estudiante[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
