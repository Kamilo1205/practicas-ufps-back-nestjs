import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentanteLegalService } from './representante-legal.service';
import { RepresentanteLegalController } from './representante-legal.controller';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { DocumentoIdentidadModule } from 'src/documento-identidad/documento-identidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepresentanteLegal]),
    DocumentoIdentidadModule,
  ],
  controllers: [RepresentanteLegalController],
  providers: [RepresentanteLegalService],
})
export class RepresentanteLegalModule {}
