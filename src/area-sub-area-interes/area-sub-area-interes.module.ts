import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaSubAreaInteres } from './entities/area-sub-area-interes.entity';
import { AreaSubAreaInteresService } from './area-sub-area-interes.service';
import { AreaSubAreaInteresController } from './area-sub-area-interes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AreaSubAreaInteres])],
  controllers: [AreaSubAreaInteresController],
  providers: [AreaSubAreaInteresService],
})
export class AreaSubAreaInteresModule {}
