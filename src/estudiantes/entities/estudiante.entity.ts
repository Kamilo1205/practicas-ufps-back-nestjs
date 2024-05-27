import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { TipoAfiliacionEps } from 'src/tipo-afiliacion-eps/entities/tipo-afiliacion-eps.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  primerNombre: string;

  @Column()
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

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

  @Column({ type: 'date'})
  fechaNacimiento: Date;

  @Column()
  numeroDocumento: string;
  
  @Column()
  lugarExpedicionDocumento: string;

  @Column({ type: 'date' })
  fechaExpedicionDocumento: Date;
    
  @Column({ type: 'date' })
  fechaAfiliacionEps: Date;

  @Column()
  semestreMatriculado: number;

  @Column()
  codigo: number;

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

  @ManyToOne(() => Eps, (eps) => eps.estudiantes)
  @JoinColumn()
  eps: Eps;

  @ManyToOne(() => TipoAfiliacionEps, (tipoAfiliacionEps) => tipoAfiliacionEps.estudiantes)
  @JoinColumn()
  tipoAfiliacionEps: TipoAfiliacionEps
}
