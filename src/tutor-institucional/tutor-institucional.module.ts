import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorInstitucionalService } from './tutor-institucional.service';
import { TutorInstitucionalController } from './tutor-institucional.controller';
import { TutorInstitucional } from './entities/tutor-institucional.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutorInstitucional]),
    UsuariosModule
  ],
  controllers: [TutorInstitucionalController],
  providers: [TutorInstitucionalService],
})
export class TutorInstitucionalModule {}
