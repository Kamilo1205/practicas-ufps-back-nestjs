import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class GrupoPractica extends BaseEntity {
  @Column()
  nombre: string;
}
