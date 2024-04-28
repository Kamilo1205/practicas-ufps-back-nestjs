import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { DocumentoIdentidad } from 'src/documento-identidad/entities/documento-identidad.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';

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
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;

  // Relaciones
  @OneToOne(() => DocumentoIdentidad, (documentoIdentidad) => documentoIdentidad.representanteLegal, { eager: true })
  @JoinColumn()
  documentoIdentidad: DocumentoIdentidad;

  @OneToMany(() => Empresa, (empresa) => empresa.representanteLegal)
  empresas: Empresa[];
}
