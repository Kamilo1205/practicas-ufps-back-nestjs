import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoAfiliacionEps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
}
