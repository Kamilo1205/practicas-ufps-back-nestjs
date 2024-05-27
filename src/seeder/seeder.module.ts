import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SeederController } from './seeder.controller';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';
import { SubAreasInteresModule } from 'src/sub-areas-interes/sub-areas-interes.module';
import { HerramientasModule } from 'src/herramientas/herramientas.module';
import { AreaSubAreaInteres } from 'src/area-sub-area-interes/entities/area-sub-area-interes.entity';

@Module({
  imports: [UsuariosModule, RolesModule, AreasInteresModule, SubAreasInteresModule, HerramientasModule, AreaSubAreaInteres],
  providers: [SeederService],
  controllers: [SeederController]
})
export class SeederModule {}
