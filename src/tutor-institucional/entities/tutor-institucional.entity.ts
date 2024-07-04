import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { GrupoPractica } from 'src/grupo-practicas/entities/grupo-practica.entity';

@Entity()
export class TutorInstitucional extends BaseEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @OneToOne(() => Usuario, (usuario) => usuario, { eager: true })
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => GrupoPractica, (grupoPractica) => grupoPractica.tutor)
  gruposPracticas: GrupoPractica[];
}
