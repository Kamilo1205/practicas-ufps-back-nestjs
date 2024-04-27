import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from './dto';
import { DocumentoIdentidadExistsException, DocumentoIdentidadNotFoundException } from './exceptions';
import { DocumentoIdentidad } from './entities/documento-identidad.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';

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
    documentoFile: Express.Multer.File,
    folderId: string,
  ) {
    const { numero, tipoDocumentoId } = createDocumentoIdentidadDto;
    const existingDocumentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ numero });
    if (existingDocumentoIdentidad) throw new DocumentoIdentidadExistsException(numero);
    
    const tipoDocumento = await this.tipoDocumentoService.findOne(tipoDocumentoId);
    const documentoUrl = await this.googleDriveService.uploadFile('Documento', [folderId], documentoFile);

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

  async update(id: string, updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto, documentoFile?: Express.Multer.File, folderId?: string) {
    const documentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ id });
    if (!documentoIdentidad) throw new DocumentoIdentidadNotFoundException(id);
    
    const { numero } = updateDocumentoIdentidadDto;
    if (numero) {
      const existingDocumentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ numero });
      if (existingDocumentoIdentidad) throw new DocumentoIdentidadExistsException(numero);
    }
    
    if (documentoFile) {
      this.googleDriveService.deleteFile(documentoIdentidad.documentoUrl);
      const documentoUrl = await this.googleDriveService.uploadFile('Documento', [folderId], documentoFile);
      await this.documentoIdentidadRepository.update(id, {...updateDocumentoIdentidadDto, documentoUrl });  
    } else {
      await this.documentoIdentidadRepository.update(id,updateDocumentoIdentidadDto);
    } 
    return await this.documentoIdentidadRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const documentoIdentidad = await this.documentoIdentidadRepository.findOneBy({ id });
    if (!documentoIdentidad) throw new DocumentoIdentidadNotFoundException(id);
    return this.documentoIdentidadRepository.remove(documentoIdentidad);
  }
}
