import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoPracticasService } from './grupo-practicas.service';
import { GrupoPracticasController } from './grupo-practicas.controller';
import { GrupoPractica } from './entities/grupo-practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoPractica]),],
  controllers: [GrupoPracticasController],
  providers: [GrupoPracticasService],
})
export class GrupoPracticasModule {}
