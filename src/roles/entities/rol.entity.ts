import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { UsuarioRol } from 'src/usuarios/entities/usuario-rol.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion?: Date;

  //Relaciones
  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  usuarios: UsuarioRol[];

  @ManyToMany(() => Permiso, (permiso) => permiso.roles)
  @JoinTable({ name: 'rol_permiso' })
  permisos: Permiso[];
}
