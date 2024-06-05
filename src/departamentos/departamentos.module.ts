import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { Departamento } from './entities/departamento.entity';
import { PaisesModule } from 'src/paises/paises.module';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento]), PaisesModule],
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  exports: [DepartamentosService]
})
export class DepartamentosModule {}
