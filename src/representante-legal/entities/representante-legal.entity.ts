import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DocumentoIdentidad } from 'src/documento-identidad/entities/documento-identidad.entity';

@Entity()
export class RepresentanteLegal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(
    () => DocumentoIdentidad,
    //(documentoIdentidad) => documentoIdentidad.representanteLegal,
  )
  @JoinColumn()
  documentoIdentidad: DocumentoIdentidad;
}
