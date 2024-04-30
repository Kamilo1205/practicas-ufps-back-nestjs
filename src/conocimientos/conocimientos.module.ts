import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConocimientosService } from './conocimientos.service';
import { ConocimientosController } from './conocimientos.controller';
import { Conocimiento } from './entities/conocimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conocimiento])],
  controllers: [ConocimientosController],
  providers: [ConocimientosService],
  exports: [ConocimientosService]
})
export class ConocimientosModule {}
