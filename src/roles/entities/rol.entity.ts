import { Entity, Column, ManyToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Rol extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios: Usuario[];
}
