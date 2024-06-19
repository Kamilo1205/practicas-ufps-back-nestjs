import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasSolicitudesService } from './empresas-solicitudes.service';
import { EmpresasSolicitudesController } from './empresas-solicitudes.controller';
import { EmpresaSolicitud } from './entities/empresas-solicitud.entity';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { SemestreModule } from 'src/semestre/semestre.module';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';
import { HerramientasModule } from 'src/herramientas/herramientas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmpresaSolicitud]),
    EmpresasModule,
    SemestreModule,
    AreasInteresModule,
    HerramientasModule
  ],
  controllers: [EmpresasSolicitudesController],
  providers: [EmpresasSolicitudesService],
  exports: [EmpresasSolicitudesService]
})
export class EmpresasSolicitudesModule {}
