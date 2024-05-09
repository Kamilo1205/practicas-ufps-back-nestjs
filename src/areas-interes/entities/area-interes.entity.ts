import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class AreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn({ type: 'date' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'date' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ type: 'date' })
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
