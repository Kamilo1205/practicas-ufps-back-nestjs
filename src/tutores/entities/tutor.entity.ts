import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { Informe } from 'src/informe/entities/informe.entity';

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

  @OneToOne(() => Usuario, (usuario) => usuario.tutor, { eager: true })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Empresa, (empresa) => empresa.tutores)
  empresa: Empresa;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.tutor)
  asignaciones: Asignacion[];

  @OneToMany(() => Informe, (informe) => informe.tutorEmpresarialAprobo)
  informesAprobados: Informe[];
}
