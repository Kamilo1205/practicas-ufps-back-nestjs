import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { EmpresaSolicitud } from 'src/empresas-solicitudes/entities/empresas-solicitud.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmpresaSolicitudesAreaInteres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nivelInteres: number;

  @ManyToOne(() => EmpresaSolicitud, (empresaSolicitud) => empresaSolicitud.empresaSolicitudAreaInteres, { onDelete: 'CASCADE' })
  solicitud: EmpresaSolicitud;

  @ManyToOne(() => AreaInteres, (areaInteres) => areaInteres.empresaSolicitudAreaInteres, { onDelete: 'CASCADE' })
  areaInteres: AreaInteres;
}
