import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { RepresentanteLegalExistsException, RepresentanteLegalNotFoundException } from './exceptions';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { DocumentoIdentidadService } from 'src/documento-identidad/documento-identidad.service';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from 'src/documento-identidad/dto';

@Injectable()
export class RepresentanteLegalService {
  constructor(
    @InjectRepository(RepresentanteLegal)
    private readonly representanteLegalRepository: Repository<RepresentanteLegal>,
    private readonly documentoIdentidadService: DocumentoIdentidadService,
  ) {}

  async create(
    createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    documento: Express.Multer.File,
    folderId: string,
  ) {
    const { email } = createRepresentanteLegalDto;
    const existingRepresentanteLegal = await this.representanteLegalRepository.findOneBy({ email });
    if (existingRepresentanteLegal) throw new RepresentanteLegalExistsException(email);
    
    const documentoIdentidad = await this.documentoIdentidadService.create(createDocumentoIdentidadDto, documento, folderId);
    const representanteLegal = this.representanteLegalRepository.create({
      ...createRepresentanteLegalDto,
      documentoIdentidad,
    });
    return this.representanteLegalRepository.save(representanteLegal);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.representanteLegalRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      }
    });
    return { data, total };
  }

  async findOne(id: string) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);
    return representanteLegal;
  }

  async update(
    id: string, 
    updateRepresentanteLegalDto: UpdateRepresentanteLegalDto, 
    updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
    documento: Express.Multer.File,
    folderId: string,
  ) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);

    const { email } = updateRepresentanteLegalDto;
    if (email) {
      const existingRepresentanteLegal = await this.representanteLegalRepository.findOneBy({ email });
      if (existingRepresentanteLegal) throw new RepresentanteLegalExistsException(email);
    }

    if (updateDocumentoIdentidadDto) {
      const documentoIdentidadId = representanteLegal.documentoIdentidad.id;
      await this.documentoIdentidadService.update(documentoIdentidadId, updateDocumentoIdentidadDto, documento, folderId);
    }
    return this.representanteLegalRepository.update(id, updateRepresentanteLegalDto);
  }

  async remove(id: string) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);
    return this.representanteLegalRepository.softDelete({ id });
  }
}
