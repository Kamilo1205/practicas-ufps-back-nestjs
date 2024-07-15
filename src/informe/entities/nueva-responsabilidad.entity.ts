import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class NuevaResponsabilidad extends BaseEntity {
  @Column()
  nombre: string;

  
}