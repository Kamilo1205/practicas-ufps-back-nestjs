import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubAreasInteres } from './entities/sub-areas-interes.entity';
import { SubAreasInteresService } from './sub-areas-interes.service';
import { SubAreasInteresController } from './sub-areas-interes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubAreasInteres])],
  controllers: [SubAreasInteresController],
  providers: [SubAreasInteresService],
  exports: [SubAreasInteresService]
})
export class SubAreasInteresModule {}
