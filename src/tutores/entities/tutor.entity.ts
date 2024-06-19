import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Entity()
export class Tutor extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column()
  telefono: string;

  @Column()
  direccionTrabajo: string;

  @OneToOne(() => Usuario, (usuario) => usuario.tutor)
  @JoinTable()
  usuario: Usuario;

  @ManyToOne(() => Empresa, (empresa) => empresa.tutores)
  empresa: Empresa;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.tutor)
  asignaciones: Asignacion[];
}
