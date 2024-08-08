import { Module } from '@nestjs/common';
import { DependenciasController } from './dependencias.controller';
import { DependenciasService } from './dependencias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependencia } from './entities/dependencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dependencia])],
  controllers: [DependenciasController],
  providers: [DependenciasService]
})
export class DependenciasModule {}
