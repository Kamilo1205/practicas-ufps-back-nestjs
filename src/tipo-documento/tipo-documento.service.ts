import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';
import { TipoDocumento } from './entities/tipo-documento.entity';

@Injectable()
export class TipoDocumentoService {
  constructor(
    @InjectRepository(TipoDocumento)
    private readonly tipoDocumentoRepository: Repository<TipoDocumento>,
  ) {}

  create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return this.tipoDocumentoRepository.save(createTipoDocumentoDto);
  }

  findAll() {
    return this.tipoDocumentoRepository.find();
  }

  findOne(id: string) {
    return this.tipoDocumentoRepository.findOne({ where: { id } });
  }

  update(id: string, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    return this.tipoDocumentoRepository.update(id, updateTipoDocumentoDto);
  }

  remove(id: string) {
    return this.tipoDocumentoRepository.softDelete({ id });
  }
}
