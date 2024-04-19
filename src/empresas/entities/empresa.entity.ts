import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @Column()
  direccion: string;

  @Column({ unique: true })
  nit: string;

  @Column()
  telefono: string;

  @Column()
  pais: string;

  @Column()
  departamento: string;

  @Column()
  municipio: string;

  @Column()
  industria: string;

  @Column({ nullable: true })
  rutUrl?: string;

  @Column({ nullable: true })
  camaraComercialUrl: string;

  @Column({ nullable: true })
  registroMercantilUrl: string;

  @Column({ nullable: true })
  googleDriveFolderId: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.empresa)
  @JoinColumn()
  usuario: Usuario;
}
