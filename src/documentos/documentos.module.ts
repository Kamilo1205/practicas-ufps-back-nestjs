import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { DecanoModule } from 'src/decano/decano.module';

@Module({
  imports: [DecanoModule],
  providers: [DocumentosService],
  controllers: [DocumentosController],
  exports: [DocumentosService]
})
export class DocumentosModule {}
