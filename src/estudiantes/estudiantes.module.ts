import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { CiudadesModule } from 'src/ciudades/ciudades.module';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    CiudadesModule,
    DepartamentosModule
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService]
})
export class EstudiantesModule {}
