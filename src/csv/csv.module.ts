import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RolesModule } from 'src/roles/roles.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { SemestreModule } from 'src/semestre/semestre.module';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    EstudiantesModule,
    SemestreModule
  ],
  controllers: [CsvController],
  providers: [CsvService],
})
export class CsvModule {}
