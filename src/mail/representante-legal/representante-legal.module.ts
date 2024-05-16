import { Module } from '@nestjs/common';
import { RepresentanteLegalService } from './representante-legal.service';
import { RepresentanteLegalController } from './representante-legal.controller';

@Module({
  controllers: [RepresentanteLegalController],
  providers: [RepresentanteLegalService],
})
export class RepresentanteLegalModule {}
