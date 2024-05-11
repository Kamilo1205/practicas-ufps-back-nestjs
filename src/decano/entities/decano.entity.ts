import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Genero } from 'src/common/enums';

@Entity()
export class Decano {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  nombre: string;

  @Column()
  apellido: string;

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
