import { Module } from '@nestjs/common';
import { DecanoService } from './decano.service';
import { DecanoController } from './decano.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decano } from './entities/decano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Decano])],
  controllers: [DecanoController],
  providers: [DecanoService],
})
export class DecanoModule {}
