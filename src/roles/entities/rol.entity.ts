import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
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
  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.rol)
  usuarios: UsuarioRol[];
}
