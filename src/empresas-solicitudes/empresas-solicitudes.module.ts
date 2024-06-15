import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasSolicitudesService } from './empresas-solicitudes.service';
import { EmpresasSolicitudesController } from './empresas-solicitudes.controller';
import { EmpresaSolicitud } from './entities/empresas-solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaSolicitud])],
  controllers: [EmpresasSolicitudesController],
  providers: [EmpresasSolicitudesService],
})
export class EmpresasSolicitudesModule {}
