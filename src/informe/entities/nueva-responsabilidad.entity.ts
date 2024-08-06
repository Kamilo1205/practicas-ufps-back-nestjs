import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Informe } from './informe.entity';

@Entity()
export class NuevaResponsabilidad extends BaseEntity {
  @Column()
  nombre: string;

  @ManyToOne(() => Informe, (informe) => informe.nuevasResponsabilidades)
  informe: Informe;
}