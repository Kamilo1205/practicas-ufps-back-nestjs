import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion?: Date;

  //Relaciones
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];

  @ManyToMany(() => Permiso)
  @JoinTable()
  permisos: Permiso[];
}
