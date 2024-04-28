import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';

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

  @Column()
  pais: string;

  @Column({ nullable: true })
  departamento: string;

  @Column()
  ciudad: string;

  @Column()
  industria: string;

  @Column({ nullable: true })
  rutUrl?: string;

  @Column({ nullable: true })
  camaraComercialUrl: string;

  @Column({ nullable: true })
  googleDriveFolderId: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(() => Usuario, (usuario) => usuario.empresa)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => RepresentanteLegal, (representanteLegal) => representanteLegal.empresas)
  @JoinColumn()
  representanteLegal: RepresentanteLegal;
}
