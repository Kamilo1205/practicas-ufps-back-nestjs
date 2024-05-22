import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Anio } from 'src/anio/entities/anio.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Semestre {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Anio, (anio) => anio.semestres)
  anio: Anio;
  
  @Column()
  semestre: number;
  
  @Column()
  googleDriveFolderId: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: Date;

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
