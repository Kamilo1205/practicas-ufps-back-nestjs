import { Column, Entity, OneToMany } from 'typeorm';
import { Semestre } from 'src/semestre/entities/semestre.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Anio extends BaseEntity {
  @Column({ unique: true })
  anio: number;

  @OneToMany(() => Semestre, (semestre) => semestre.anio)
  semestres: Semestre[];

  @Column()
  googleDriveFolderId: string;

  @Column({ default: false })
  actual: boolean;
}
