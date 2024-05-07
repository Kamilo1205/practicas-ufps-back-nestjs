import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsService } from './eps.service';
import { EpsController } from './eps.controller';
import { Eps } from './entities/eps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eps])],
  controllers: [EpsController],
  providers: [EpsService],
  exports: [EpsService]
})
export class EpsModule {}
