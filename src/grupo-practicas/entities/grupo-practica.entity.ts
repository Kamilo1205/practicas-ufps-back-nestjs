import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { TutorInstitucional } from 'src/tutor-institucional/entities/tutor-institucional.entity';

@Entity()
export class GrupoPractica extends BaseEntity {
  @Column()
  nombre: string;

  @ManyToOne(() => TutorInstitucional, (tutorInstitucional) => tutorInstitucional.gruposPracticas)
  tutor: TutorInstitucional;
}
