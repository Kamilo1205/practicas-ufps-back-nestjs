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
import { GrupoPractica } from 'src/grupo-practicas/entities/grupo-practica.entity';

@Entity()
export class Estudiante extends BaseEntity {
  @Column({ nullable: true })
  primerNombre: string;

  @Column({ nullable: true })
  segundoNombre: string;

  @Column({ nullable: true })
  primerApellido: string;

  @Column({ nullable: true })
  segundoApellido: string;

  @Column({ nullable: true })
  genero: string;

  @Column({ default: '', nullable: true })
  direccionResidencia: string;

  @Column({ nullable: true })
  telefono: string;

  @OneToOne(() => GrupoPractica)
  @JoinColumn()
  grupoMatriculado: GrupoPractica;

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinTable()
  ciudadResidencia: Ciudad;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  numeroDocumento: string;
  
  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinTable()
  lugarExpedicionDocumento: Ciudad;

  @Column({ type: 'date', nullable: true })
  fechaExpedicionDocumento: Date;
    
  @Column({ type: 'date', nullable: true })
  fechaAfiliacionEps: Date;

  @Column({ nullable: true })
  semestreMatriculado: number;

  @Column({ default: null, nullable: true })
  certificadoAfiliacionEpsUrl: string;
  
  @Column({ default: null, nullable: true })
  documentoIdentidadUrl: string;
  
  @Column({ default: null, nullable: true })
  hojaDeVidaUrl: string;
  
  @Column({ default: null, nullable: true })
  horarioClaseUrl: string;

  @Column({ nullable: true })
  codigo: number;

  @OneToOne(() => Usuario, (usuario) => usuario.estudiante)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.estudiantes, { nullable: true })
  @JoinColumn()
  tipoDocumento: TipoDocumento;

  @ManyToOne(() => Eps, (eps) => eps.estudiantes, { nullable: true })
  @JoinColumn()
  eps: Eps;

  @ManyToOne(() => TipoAfiliacionEps, (tipoAfiliacionEps) => tipoAfiliacionEps.estudiantes, { nullable: true })
  @JoinColumn()
  tipoAfiliacionEps: TipoAfiliacionEps;

  @ManyToMany(() => Semestre, (semestre) => semestre.estudiantes, { nullable: true })
  @JoinTable({ name: 'estudiante_semestre' })
  semestres: Semestre[];

  @OneToMany(() => EstudianteAreaInteres, (estudianteAreaInteres) => estudianteAreaInteres.estudiante, { nullable: true })
  estudianteAreaInteres: EstudianteAreaInteres[];

  @ManyToMany(() => Herramienta, (herramienta) => herramienta.estudiantes, { nullable: true })
  @JoinTable({ name: 'estudiante_herramienta' })
  herramientas: Herramienta[];

  @OneToMany(() => Asignacion, (asignacion) => asignacion.estudiante, { eager: true })
  asignaciones: Asignacion[];

  @OneToMany(() => PlanDeTrabajo, (planDeTrabajo) => planDeTrabajo.estudiante, { nullable: true })
  planesDeTrabajo: PlanDeTrabajo[];
}
