import { Module } from '@nestjs/common';
import { DependenciasController } from './dependencias.controller';
import { DependenciasService } from './dependencias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependencia } from './entities/dependencia.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dependencia]), UsuariosModule],
  controllers: [DependenciasController],
  providers: [DependenciasService],
  exports: [DependenciasService]
})
export class DependenciasModule {}
