import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaInteresHerramienta } from './entities/area-interes-herramienta.entity';
import { AreaInteresHerramientasService } from './area-interes-herramientas.service';
import { AreaInteresHerramientasController } from './area-interes-herramientas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AreaInteresHerramienta])],
  controllers: [AreaInteresHerramientasController],
  providers: [AreaInteresHerramientasService],
})
export class AreaInteresHerramientasModule {}
