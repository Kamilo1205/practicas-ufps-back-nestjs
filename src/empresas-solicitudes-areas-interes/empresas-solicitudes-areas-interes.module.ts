import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasSolicitudesAreasInteresService } from './empresas-solicitudes-areas-interes.service';
import { EmpresaSolicitudesAreaInteres } from './entities/empresas-solicitudes-areas-intere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaSolicitudesAreaInteres])],
  providers: [EmpresasSolicitudesAreasInteresService],
})
export class EmpresasSolicitudesAreasInteresModule {}
