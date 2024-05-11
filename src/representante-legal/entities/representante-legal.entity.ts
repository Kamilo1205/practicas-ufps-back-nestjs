import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Transform } from 'class-transformer';

@Entity()
export class RepresentanteLegal {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  numeroDocumento: string;

  @Column({ type: 'date' })
  fechaExpedicionDocumento: Date;

  @Column()
  lugarExpedicionDocumento: string;

  @Column()
  documentoUrl: string;

  @CreateDateColumn({ type: 'date' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'date' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ type: 'date' })
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.representantesLegales, { eager: true })
  TipoDocumento: TipoDocumento;
}
