import { Entity, ManyToOne } from 'typeorm';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class AreaInteresHerramienta extends BaseEntity {
  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.areaInteresHerramientas, { onDelete: 'CASCADE' })
  areaInteres: AreaInteres;

  @ManyToOne(() => Herramienta, (herramienta) => herramienta.areainteresHerramientas, { onDelete: 'CASCADE' })
  herramienta: Herramienta;
}
