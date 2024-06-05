import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentanteLegalService } from './representante-legal.service';
import { RepresentanteLegalController } from './representante-legal.controller';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { CiudadesModule } from 'src/ciudades/ciudades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepresentanteLegal]),
    CiudadesModule
  ],
  controllers: [RepresentanteLegalController],
  providers: [RepresentanteLegalService],
  exports: [RepresentanteLegalService]
})
export class RepresentanteLegalModule {}
