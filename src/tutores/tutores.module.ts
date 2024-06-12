import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoresService } from './tutores.service';
import { TutoresController } from './tutores.controller';
import { Tutor } from './entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  controllers: [TutoresController],
  providers: [TutoresService],
})
export class TutoresModule {}
