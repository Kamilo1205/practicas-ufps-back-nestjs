import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { TipoAfiliacionEps } from 'src/tipo-afiliacion-eps/entities/tipo-afiliacion-eps.entity';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { EstudianteAreaInteres } from 'src/estudiante-area-interes/entities/estudiante-area-interes.entity';
import { Herramienta } from 'src/herramientas/entities/herramienta.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Entity()
export class Estudiante extends BaseEntity {
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

  @Column({ default: '', nullable: true })
  direccionResidencia: string;

  @Column()
  telefono: string;

  @Column({ default: 'GrupoA' })
  grupoMatriculado: string;

  @ManyToOne(() => Ciudad)
  @JoinTable()
  ciudadResidencia: Ciudad;

  @Column({ type: 'date'})
  fechaNacimiento: Date;

  @Column()
  numeroDocumento: string;
  
  @ManyToOne(() => Ciudad)
  @JoinTable()
  lugarExpedicionDocumento: Ciudad;

  @Column({ type: 'date' })
  fechaExpedicionDocumento: Date;
    
  @Column({ type: 'date' })
  fechaAfiliacionEps: Date;

  @Column()
  semestreMatriculado: number;

  @Column({ default: null })
  certificadoAfiliacionEpsUrl: string;
  
  @Column({ default: null })
  documentoIdentidadUrl: string;
  
  @Column({ default: null })
  hojaDeVidaUrl: string;
  
  @Column({ default: null })
  horarioClaseUrl: string;

  @Column()
  codigo: number;

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
  tipoAfiliacionEps: TipoAfiliacionEps;

  @ManyToMany(() => Semestre, (semestre) => semestre.estudiantes)
  @JoinTable({ name: 'estudiante_semestre' })
  semestres: Semestre[];

  @OneToMany(() => EstudianteAreaInteres, (estudianteAreaInteres) => estudianteAreaInteres.estudiante)
  estudianteAreaInteres: EstudianteAreaInteres[];

  @ManyToMany(() => Herramienta, (herramienta) => herramienta.estudiantes)
  @JoinTable({ name: 'estudiante_herramienta' })
  herramientas: Herramienta[];

  @OneToMany(() => Asignacion, (asignacion) => asignacion.estudiante)
  asignaciones: Asignacion[];

  @OneToMany(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.estudiante)
  planesDeTrabajo: PlanDeTrabajo[];
}
