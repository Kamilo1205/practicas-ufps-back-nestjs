import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRepresentanteLegalDto,
  UpdateRepresentanteLegalDto,
} from './dto';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { DocumentoIdentidadService } from 'src/documento-identidad/documento-identidad.service';
import { CreateDocumentoIdentidadDto } from 'src/documento-identidad/dto';

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
    file: Express.Multer.File,
    folderId: string,
  ) {
    const documentoIdentidad = await this.documentoIdentidadService.create(
      createDocumentoIdentidadDto,
      file,
      folderId,
    );
    return this.representanteLegalRepository.save({
      ...createRepresentanteLegalDto,
      documentoIdentidad,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.representanteLegalRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
    });
    return { data, total };
  }

  findOne(id: string) {
    return this.representanteLegalRepository.findOne({ where: { id } });
  }

  update(id: string, updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    return this.representanteLegalRepository.update(
      id,
      updateRepresentanteLegalDto,
    );
  }

  remove(id: string) {
    return this.representanteLegalRepository.softDelete({ id });
  }
}
