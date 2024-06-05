import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Transform } from 'class-transformer';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';

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

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.representantesLegales, { eager: true })
  @JoinColumn()
  lugarExpedicionDocumento: Ciudad;

  @Column()
  documentoIdentidadUrl: string;

  @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.representantesLegales, { eager: true })
  TipoDocumento: TipoDocumento;

  @OneToMany(() => Empresa, (empresa) => empresa.representanteLegal)
  empresas: Empresa[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @DeleteDateColumn()
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
