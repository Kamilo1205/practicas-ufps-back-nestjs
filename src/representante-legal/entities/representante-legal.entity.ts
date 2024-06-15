import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TipoDocumento } from 'src/tipo-documento/entities/tipo-documento.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class RepresentanteLegal extends BaseEntity {
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
}
