import { CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { SubAreasInteres } from 'src/sub-areas-interes/entities/sub-areas-interes.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';

@Entity()
export class AreaSubAreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.areaSubArea)
  areaInteres: AreaInteres;
 
  @ManyToOne(() => SubAreasInteres, (subAreasInteres) => subAreasInteres.areaSubArea, { eager: true })
  subAreasInteres: SubAreasInteres;

  @ManyToMany(() => Herramienta, { eager: true })
  @JoinTable({ name: 'area_sub_area_interes_herramienta' })
  herramientas: Herramienta[];
  
  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
