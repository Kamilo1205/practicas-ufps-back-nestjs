import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { NuevaResponsabilidad } from './nueva-responsabilidad.entity';

@Entity()
export class Informe extends BaseEntity {
  @Column()
  adaptacion: string;

  @Column()
  tolerancia: string;

  @Column()
  nuevasResponsabilidades: NuevaResponsabilidad[];
  
  @Column()
  compromisoEficiencia: string;

  @Column()
  conclusion: string;  
}
