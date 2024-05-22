import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Semestre } from 'src/semestre/entities/semestre.entity';

@Entity()
export class Anio {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  anio: number;

  @OneToMany(() => Semestre, (semestre) => semestre.anio)
  semestres: Semestre[];

  @Column()
  googleDriveFolderId: string;
  
  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
