import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SeederController } from './seeder.controller';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';
import { HerramientasModule } from 'src/herramientas/herramientas.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { PaisesModule } from 'src/paises/paises.module';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';
import { CiudadesModule } from 'src/ciudades/ciudades.module';
import { EpsModule } from 'src/eps/eps.module';
import { TipoDocumentoModule } from 'src/tipo-documento/tipo-documento.module';
import { TipoAfiliacionEpsModule } from 'src/tipo-afiliacion-eps/tipo-afiliacion-eps.module';

@Module({
  imports: [
    UsuariosModule, 
    RolesModule, 
    AreasInteresModule, 
    HerramientasModule, 
    EstudiantesModule,
    PaisesModule,
    DepartamentosModule,
    CiudadesModule,
    EpsModule,
    TipoDocumentoModule,
    TipoAfiliacionEpsModule
  ],
  providers: [SeederService],
  controllers: [SeederController]
})
export class SeederModule {}
