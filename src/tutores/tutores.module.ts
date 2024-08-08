import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoresService } from './tutores.service';
import { TutoresController } from './tutores.controller';
import { Tutor } from './entities/tutor.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { DependenciasModule } from 'src/dependencias/dependencias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor]), UsuariosModule, EmpresasModule, DependenciasModule],
  controllers: [TutoresController],
  providers: [TutoresService],
  exports: [TutoresService]
})
export class TutoresModule {}
