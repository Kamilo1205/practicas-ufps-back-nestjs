import { Column, Entity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

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
}
