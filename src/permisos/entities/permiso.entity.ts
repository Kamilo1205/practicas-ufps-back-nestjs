import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Permiso {
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
  fechaEliminacion?: Date;
}
