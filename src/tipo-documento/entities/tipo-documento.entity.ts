import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { DocumentoIdentidad } from 'src/documento-identidad/entities/documento-identidad.entity';

@Entity()
export class TipoDocumento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
