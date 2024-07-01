import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class TutorInstitucional extends BaseEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @OneToOne(() => Usuario, (usuario) => usuario)
  usuario: Usuario;
}
