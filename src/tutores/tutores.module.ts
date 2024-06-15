import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoresService } from './tutores.service';
import { TutoresController } from './tutores.controller';
import { Tutor } from './entities/tutor.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tutor]), 
    UsuariosModule
  ],
  controllers: [TutoresController],
  providers: [TutoresService],
  exports: [TutoresService]
})
export class TutoresModule {}
