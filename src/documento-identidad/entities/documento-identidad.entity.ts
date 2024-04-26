import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Transform } from 'class-transformer';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { RepresentanteLegal } from 'src/representante-legal/entities/representante-legal.entity';

@Entity()
export class DocumentoIdentidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  numero: string;

  @Column()
  fechaExpedicion: Date;

  @Column()
  lugarExpedicion: string;

  @Column()
  documentoUrl: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;

  // Relaciones
  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.documentos)
  tipoDocumento: TipoDocumento;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.documentoIdentidad)
  @Transform(({ value }) => (value ? value : undefined))
  estudiante: Estudiante;

  @OneToOne(() => RepresentanteLegal, (representanteLegal) => representanteLegal.documentoIdentidad)
  @Transform(({ value }) => (value ? value : undefined))
  representanteLegal: RepresentanteLegal;
}
