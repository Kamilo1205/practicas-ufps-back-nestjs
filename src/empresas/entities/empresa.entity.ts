import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { Industria } from 'src/industrias/entities/industria.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { EmpresaSolicitud } from 'src/empresas-solicitudes/entities/empresas-solicitud.entity';

@Entity()
export class Empresa extends BaseEntity {
  @Column()
  nombreLegal: string;

  @Column()
  nombreComercial: string;

  @Column()
  direccion: string;

  @Column({ unique: true })
  nit: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  rutUrl: string;

  @Column()
  camaraComercioUrl: string;

  @Column({ nullable: true })
  soilicitudConvenioUrl: string;

  @Column({ nullable: true })
  convenioUrl: string;

  @Column({ default: false })
  convenioActivo: boolean;

  @Column()
  googleDriveFolderId: string;

  @OneToOne(() => Usuario, (usuario) => usuario.empresa)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => RepresentanteLegal, (representanteLegal) => representanteLegal.empresas, { eager: true })
  @JoinColumn()
  representanteLegal: RepresentanteLegal;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.empresas, { eager: true })
  @JoinColumn()
  ciudad: Ciudad;

  @ManyToOne(() => Industria, (industria) => industria.empresas, { eager: true })
  @JoinColumn()
  industria: Industria;

  @OneToMany(() => Tutor, (tutor) => tutor.empresa)
  @JoinColumn()
  tutores: Tutor[];

  @OneToMany(() => EmpresaSolicitud, (empresaSolicitud) => empresaSolicitud.empresa)
  @JoinColumn()
  solicitudes: EmpresaSolicitud[];
}
