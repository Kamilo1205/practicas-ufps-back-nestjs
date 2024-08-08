import { BaseEntity } from 'src/common/entities/base.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export class Dependencia extends BaseEntity{
  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  personaACargo: string;

  @OneToOne(() => Usuario, )
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Tutor, (tutor) => tutor.dependencia, { eager: true })
  @JoinColumn()
  tutores: Tutor[];
}