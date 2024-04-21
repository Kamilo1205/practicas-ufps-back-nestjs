import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoIdentidadService } from './documento-identidad.service';
import { DocumentoIdentidadController } from './documento-identidad.controller';
import { DocumentoIdentidad } from './entities/documento-identidad.entity';
import { TipoDocumentoModule } from 'src/tipo-documento/tipo-documento.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoIdentidad]),
    GoogleDriveModule,
    TipoDocumentoModule,
  ],
  controllers: [DocumentoIdentidadController],
  providers: [DocumentoIdentidadService],
  exports: [DocumentoIdentidadService],
})
export class DocumentoIdentidadModule {}
