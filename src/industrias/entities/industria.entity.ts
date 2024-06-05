import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Empresa } from 'src/empresas/entities/empresa.entity';

@Entity()
export class Industria {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Empresa, (empresa) => empresa.industria)
  empresas: Empresa[];

  @CreateDateColumn()
  fechaCreacion: Date;
  
  @UpdateDateColumn()
  fechaActualizacion: Date;
  
  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
