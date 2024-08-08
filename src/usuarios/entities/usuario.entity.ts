import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import { Tutor } from 'src/tutores/entities/tutor.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { TutorInstitucional } from 'src/tutor-institucional/entities/tutor-institucional.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { Director } from 'src/director/entities/director.entity';
import { Dependencia } from 'src/dependencias/entities/dependencia.entity';

@Entity() // Define que esta clase es una entidad de la base de datos.
export class Usuario extends BaseEntity {
  @Column({ unique: true }) // Define una columna única para el correo electrónico del usuario.
  email: string; // Correo electrónico del usuario (debe ser único).

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string | null; // Contraseña del usuario.

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ default: true }) // Define una columna con valor predeterminado "true".
  estaActivo: boolean; // Indica si la cuenta del usuario está activa.

  @Column({ nullable: true, default: null }) // Define una columna con valor predeterminado "false".
  emailConfirmado?: Date; // Indica si el correo electrónico del usuario está confirmado.

  @Column({ default: false }) // Define una columna con valor predeterminado "false".
  estaRegistrado: boolean; // Indica si la cuenta del usuario esta registrada.

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @ManyToMany(() => Rol, (rol) => rol.usuarios, {eager: true})
  @JoinTable({ name: 'usuario_rol' })
  roles: Rol[];

  @OneToOne(() => Empresa, (empresa) => empresa.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  empresa: Empresa;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  estudiante: Estudiante;

  @OneToOne(() => Tutor, (tutor) => tutor.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  tutor: Tutor;

  @OneToOne(() => Tutor, (tutor) => tutor.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  directorPrograma: Director;

  @OneToOne(() => TutorInstitucional, (tutorInstitucional) => tutorInstitucional.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  tutorInstitucional: TutorInstitucional;

  @OneToOne(() => Dependencia, (dependencia) => dependencia.usuario)
  @Transform(({ value }) => (value ? value : undefined))
  dependencia: Dependencia;

  @OneToMany(() => Comentario, (comentario) => comentario.autor)
  comentarios: Comentario[];
}
