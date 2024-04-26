import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from './dto';
import { DocumentoIdentidad } from './entities/documento-identidad.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';
import { DocumentoIdentidadExistsException, DocumentoIdentidadNotFoundException } from './exceptions';

@Injectable()
export class DocumentoIdentidadService {
  constructor(
    @InjectRepository(DocumentoIdentidad)
    private readonly documentoIdentidadRepository: Repository<DocumentoIdentidad>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly tipoDocumentoService: TipoDocumentoService,
  ) {}

  async create(
    createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    documento: Express.Multer.File,
    folderId: string,
  ) {
    const { numero, tipoDocumentoId } = createDocumentoIdentidadDto;
    const existingDocumentoIdentidad = this.documentoIdentidadRepository.findBy({ numero });
    if ( existingDocumentoIdentidad ) throw new DocumentoIdentidadExistsException(numero);
    
    const tipoDocumento = await this.tipoDocumentoService.findOne(tipoDocumentoId);
    const documentoUrl = await this.uploadDocumentoFile(documento, folderId);

    const documentoIdentidad = this.documentoIdentidadRepository.create({
      ...createDocumentoIdentidadDto,
      tipoDocumento,
      documentoUrl,
    });
    return this.documentoIdentidadRepository.save(documentoIdentidad);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.documentoIdentidadRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
      relations: ['estudiante', 'representanteLegal']
    });
    return { data, total };
  }

  async findOne(id: string) {
    const documentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ id });
    if (!documentoIdentidad) throw new DocumentoIdentidadNotFoundException(id);
    return documentoIdentidad;
  }

  async update(id: string, updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto) {
    const documentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ id });
    if (!documentoIdentidad) throw new DocumentoIdentidadNotFoundException(id);
    this.documentoIdentidadRepository.update(id,updateDocumentoIdentidadDto);
    return await this.documentoIdentidadRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const documentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ id });
    if (!documentoIdentidad) throw new DocumentoIdentidadNotFoundException(id);
    return this.documentoIdentidadRepository.remove(documentoIdentidad);
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
