import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAfiliacionEpsService } from './tipo-afiliacion-eps.service';
import { TipoAfiliacionEpsController } from './tipo-afiliacion-eps.controller';
import { TipoAfiliacionEps } from './entities/tipo-afiliacion-eps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAfiliacionEps])],
  controllers: [TipoAfiliacionEpsController],
  providers: [TipoAfiliacionEpsService],
  exports: [TipoAfiliacionEpsService]
})
export class TipoAfiliacionEpsModule {}
