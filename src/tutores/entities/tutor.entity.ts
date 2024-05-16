import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;


}
