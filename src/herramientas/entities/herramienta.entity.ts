import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaInteresHerramienta } from 'src/area-interes-herramientas/entities/area-interes-herramienta.entity';

@Entity()
export class Herramienta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => AreaInteresHerramienta, (areaInteresHerramienta) => areaInteresHerramienta.herramienta)
  areainteresHerramientas: AreaInteresHerramienta[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
