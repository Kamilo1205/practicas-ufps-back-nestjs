import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaSubAreaInteres } from 'src/area-sub-area-interes/entities/area-sub-area-interes.entity';

@Entity()
export class SubAreasInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => AreaSubAreaInteres, (areaSubAreaInteres) => areaSubAreaInteres.subAreasInteres)
  areaSubArea: AreaSubAreaInteres[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
