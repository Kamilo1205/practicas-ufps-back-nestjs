import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { Ciudad } from './entities/ciudad.entity';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad]), DepartamentosModule],
  controllers: [CiudadesController],
  providers: [CiudadesService],
  exports: [CiudadesService]
})
export class CiudadesModule {}
