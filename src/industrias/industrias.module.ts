import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustriasService } from './industrias.service';
import { IndustriasController } from './industrias.controller';
import { Industria } from './entities/industria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Industria])],
  controllers: [IndustriasController],
  providers: [IndustriasService],
  exports: [IndustriasService]
})
export class IndustriasModule {}
