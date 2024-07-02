import { Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class Director extends BaseEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;
  
  @OneToOne(() => Usuario, (usuario) => usuario.directorPrograma)
  @JoinColumn()
  usuario: Usuario;
}
