import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import {
  CreateDocumentoIdentidadDto,
  UpdateDocumentoIdentidadDto,
} from './dto';
import { DocumentoIdentidad } from './entities/documento-identidad.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';

@Injectable()
export class DocumentoIdentidadService {
  constructor(
    @InjectRepository(DocumentoIdentidad)
    private readonly documentoIdentidadRepository: Repository<DocumentoIdentidad>,
    private googleDriveService: GoogleDriveService,
    private tipoDocumentoService: TipoDocumentoService,
  ) {}

  async create(
    createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    documento: Express.Multer.File,
    folderId: string,
  ) {
    const documentoId = await this.uploadDocumentoFile(documento, folderId);
    const tipoDocumento = await this.tipoDocumentoService.findOne(
      createDocumentoIdentidadDto.tipoDocumentoId,
    );

    return this.documentoIdentidadRepository.save({
      ...createDocumentoIdentidadDto,
      tipoDocumento,
      documentoUrl: documentoId,
    });
  }

  findAll() {
    return this.documentoIdentidadRepository.find();
  }

  findOne(id: string) {
    return this.documentoIdentidadRepository.find({ where: { id } });
  }

  update(id: string, updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto) {
    return this.documentoIdentidadRepository.update(
      id,
      updateDocumentoIdentidadDto,
    );
  }

  remove(id: string) {
    return this.documentoIdentidadRepository.softDelete({ id });
  }

  uploadDocumentoFile(file: Express.Multer.File, folderParentId: string) {
    const fileMetadata = {
      name: 'Documento de Identidad',
      parents: [folderParentId],
    };
    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };
    return this.googleDriveService.uploadFile(fileMetadata, media);
  }
}
