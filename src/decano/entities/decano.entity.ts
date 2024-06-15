import { Column, Entity } from 'typeorm';
import { Genero } from 'src/common/enums';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Decano extends BaseEntity {
  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: Genero,
    default: Genero.Masculino
  })
  genero: Genero;

  @Column({ unique: true })
  numeroDocumento: string;

  @Column()
  lugarExpedicionDocumento: string;
}
