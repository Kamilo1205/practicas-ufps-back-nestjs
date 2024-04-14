import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity() // Define que esta clase es una entidad de la base de datos.
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Identificador único generado automáticamente para el usuario.

  @Column({ unique: true }) // Define una columna única para el correo electrónico del usuario.
  email: string; // Correo electrónico del usuario (debe ser único).

  @Column({ nullable: true })
  password?: string; // Contraseña del usuario.

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Estudiante,
  })
  rol: string; // Rol del usuario.

  @Column({ default: true }) // Define una columna con valor predeterminado "true".
  estaActivo: boolean; // Indica si la cuenta del usuario está activa.

  @Column({ nullable: true, default: null }) // Define una columna con valor predeterminado "false".
  emailConfirmado?: Date; // Indica si el correo electrónico del usuario está confirmado.

  @Column({ default: false }) // Define una columna con valor predeterminado "false".
  estaRegistrado: boolean; // Indica si la cuenta del usuario esta registrada.

  @CreateDateColumn() // Columna para la fecha y hora de creación del registro de usuario.
  fechaCreacion: Date; // Fecha y hora de creación del registro de usuario.

  @UpdateDateColumn() // Columna para la fecha y hora de la última actualización del registro de usuario.
  fechaActualizacion: Date; // Fecha y hora de la última actualización del registro de usuario.

  @DeleteDateColumn() // Columna para la fecha y hora de eliminación lógica del registro de usuario (si se elimina).
  fechaEliminacion: Date; // Fecha y hora de eliminación lógica del registro de usuario (si se aplica).
}
