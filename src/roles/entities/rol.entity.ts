import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Transform } from 'class-transformer';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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
  @ManyToMany(() => Usuario, usuario => usuario.roles)
  usuarios: Usuario[];
}
