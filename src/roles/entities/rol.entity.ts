import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @DeleteDateColumn()
  fechaEliminacion?: Date;

  //Relaciones
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
