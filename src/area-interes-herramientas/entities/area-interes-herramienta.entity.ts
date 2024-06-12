import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';

@Entity()
export class AreaInteresHerramienta {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.areaInteresHerramientas, { onDelete: 'CASCADE' })
  areaInteres: AreaInteres;

  @ManyToOne(() => Herramienta, (herramienta) => herramienta.areainteresHerramientas, { onDelete: 'CASCADE' })
  herramienta: Herramienta;

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
