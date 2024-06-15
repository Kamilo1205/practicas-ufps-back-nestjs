import { Column, Entity, OneToMany } from 'typeorm';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Industria extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Empresa, (empresa) => empresa.industria)
  empresas: Empresa[];
}
