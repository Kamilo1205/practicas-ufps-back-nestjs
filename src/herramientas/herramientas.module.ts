import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './entities/herramienta.entity';
import { HerramientasService } from './herramientas.service';
import { HerramientasController } from './herramientas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Herramienta])],
  controllers: [HerramientasController],
  providers: [HerramientasService],
})
export class HerramientasModule {}
