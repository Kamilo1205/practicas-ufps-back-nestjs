import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubActividadesService } from './sub-actividades.service';
import { SubActividadesController } from './sub-actividades.controller';
import { ActividadesModule } from 'src/actividades/actividades.module';
import { SubActividad } from './entities/sub-actividad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubActividad]),
    ActividadesModule
  ],
  controllers: [SubActividadesController],
  providers: [SubActividadesService],
  exports: [SubActividadesService]
})
export class SubActividadesModule {}
