import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
