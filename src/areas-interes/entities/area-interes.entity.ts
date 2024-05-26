import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { AreaSubAreaInteres } from 'src/area-sub-area-interes/entities/area-sub-area-interes.entity';

@Entity()
export class AreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => AreaSubAreaInteres, (areaSubAreaInteres) => areaSubAreaInteres.areaInteres, { eager: true })
  areaSubArea: AreaSubAreaInteres[];

  @CreateDateColumn({ type: 'date' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'date' })
  fechaActualizacion: Date;

  @DeleteDateColumn({ type: 'date' })
  @Transform(({ value }) => (value ? value : undefined))
  fechaEliminacion: Date;
}
