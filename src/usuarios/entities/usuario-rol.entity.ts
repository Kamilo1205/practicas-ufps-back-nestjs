import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';

@Entity()
export class UsuarioRol {
  @PrimaryColumn({ name: 'usuarioId' })
  usuarioId: string;

  @PrimaryColumn({ name: 'rolId' })
  rolId: string;
  
  @ManyToOne(() => Usuario, (usuario) => usuario.roles)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'rolId' })
  rol: Rol;

  @ManyToMany(() => Permiso, (permiso) => permiso.usuarios, { eager: true })
  @JoinTable({ name: 'usuario_rol_permiso' })
  permisos: Permiso[];
}