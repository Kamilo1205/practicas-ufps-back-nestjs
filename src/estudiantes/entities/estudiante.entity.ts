import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  genero: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  departamentoResidencia: string;

  @Column()
  municipioResidencia: string;

  @Column()
  fechaNacimiento: Date;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.estudiante)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.estudiantes)
  @JoinColumn()
  tipoDocumento: TipoDocumento;
}
