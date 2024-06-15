import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaInteresHerramienta } from './entities/area-interes-herramienta.entity';
import { AreaInteresHerramientasService } from './area-interes-herramientas.service';
import { AreaInteresHerramientasController } from './area-interes-herramientas.controller';
import { HerramientasModule } from 'src/herramientas/herramientas.module';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AreaInteresHerramienta]),
    AreasInteresModule,
    HerramientasModule
  ],
  controllers: [AreaInteresHerramientasController],
  providers: [AreaInteresHerramientasService],
})
export class AreaInteresHerramientasModule {}
