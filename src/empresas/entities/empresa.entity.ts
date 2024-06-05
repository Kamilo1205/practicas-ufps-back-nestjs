import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { Industria } from 'src/industrias/entities/industria.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

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

  @CreateDateColumn({ type: 'date' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'date' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ type: 'date' })
  fechaEliminacion: Date;
}
