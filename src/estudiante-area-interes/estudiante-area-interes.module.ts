import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteAreaInteres } from './entities/estudiante-area-interes.entity';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { EstudianteAreaInteresController } from './estudiante-area-interes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteAreaInteres])],
  controllers: [EstudianteAreaInteresController],
  providers: [EstudianteAreaInteresService],
  exports: [EstudianteAreaInteresService]
})
export class EstudianteAreaInteresModule {}
