import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEpsService } from './estudiante-eps.service';
import { EstudianteEpsController } from './estudiante-eps.controller';
import { EstudianteEps } from './entities/estudiante-eps.entity';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { EpsModule } from 'src/eps/eps.module';
import { TipoAfiliacionEps } from 'src/tipo-afiliacion-eps/entities/tipo-afiliacion-eps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEps]), GoogleDriveModule, EstudiantesModule, EpsModule, TipoAfiliacionEps],
  controllers: [EstudianteEpsController],
  providers: [EstudianteEpsService],
  exports: [EstudianteEpsService]
})
export class EstudianteEpsModule {}
