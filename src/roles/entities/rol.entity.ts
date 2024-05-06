import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { Transform } from 'class-transformer';
import { UsuarioRol } from 'src/usuario-rol/entities/usuario-rol.entity';

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
  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.rol)
  usuarios: UsuarioRol[];

  @ManyToMany(() => Permiso, { eager: true })
  @JoinTable()
  permisos: Permiso[];
}
