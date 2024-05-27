import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SeederController } from './seeder.controller';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';
import { SubAreasInteresModule } from 'src/sub-areas-interes/sub-areas-interes.module';
import { HerramientasModule } from 'src/herramientas/herramientas.module';
import { AreaSubAreaInteresModule } from 'src/area-sub-area-interes/area-sub-area-interes.module';

@Module({
  imports: [
    UsuariosModule, 
    RolesModule, 
    AreasInteresModule, 
    SubAreasInteresModule, 
    HerramientasModule, 
    AreaSubAreaInteresModule
  ],
  providers: [SeederService],
  controllers: [SeederController]
})
export class SeederModule {}
