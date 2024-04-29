import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { EstudianteAreaInteresController } from './estudiante-area-interes.controller';
import { EstudianteAreaInteres } from './entities/estudiante-area-interes.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteAreaInteres]), EstudiantesModule, AreasInteresModule],
  controllers: [EstudianteAreaInteresController],
  providers: [EstudianteAreaInteresService],
})
export class EstudianteAreaInteresModule {}
