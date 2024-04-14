import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  nit: string;

  @Column()
  telefono: string;

  @Column()
  pais: string;

  @Column()
  municipio: string;

  @Column()
  industria: string;

  @Column()
  rutUrl: string;

  @Column()
  camaraComercialUrl: string;

  @Column()
  registroMercantilUrl: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;
}
