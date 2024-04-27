import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { TipoDocumentoExistsException, TipoDocumentoNotFoundException } from './exceptions';

@Injectable()
export class TipoDocumentoService {
  constructor(
    @InjectRepository(TipoDocumento)
    private readonly tipoDocumentoRepository: Repository<TipoDocumento>,
  ) {}

  async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    const { nombre } = createTipoDocumentoDto;
    const tipoDocumento = await this.tipoDocumentoRepository.findOneBy({ nombre });
    if ( tipoDocumento ) throw new TipoDocumentoExistsException(nombre);
    return this.tipoDocumentoRepository.save(createTipoDocumentoDto);
  }

  findAll() {
    return this.tipoDocumentoRepository.find();
  }

  async findOne(id: string) {
    const tipoDocumento = await this.tipoDocumentoRepository.findOneBy({ id });
    if ( !tipoDocumento ) throw new TipoDocumentoNotFoundException(id);
    return tipoDocumento;
  }

  async update(id: string, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    const tipoDocumento = await this.tipoDocumentoRepository.findOneBy({ id });
    if ( !tipoDocumento ) throw new TipoDocumentoNotFoundException(id);
    return this.tipoDocumentoRepository.update(id, updateTipoDocumentoDto);
  }

  async remove(id: string) {
    const tipoDocumento = await this.tipoDocumentoRepository.findOneBy({ id });
    if ( !tipoDocumento ) throw new TipoDocumentoNotFoundException(id);
    return this.tipoDocumentoRepository.softDelete({ id });
  }
}
