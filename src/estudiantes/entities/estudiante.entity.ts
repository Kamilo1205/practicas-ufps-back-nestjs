import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  genero: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  departamento: string;

  @Column()
  municipio: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.estudiante)
  @JoinColumn()
  usuario: Usuario;
}
