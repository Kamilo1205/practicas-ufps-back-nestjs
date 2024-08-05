import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformeService } from './informe.service';
import { InformeController } from './informe.controller';
import { Informe } from './entities/informe.entity';
import { NuevaResponsabilidad } from './entities/nueva-responsabilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Informe, NuevaResponsabilidad])],
  controllers: [InformeController],
  providers: [InformeService],
  exports: [InformeService]
})
export class InformeModule {}
