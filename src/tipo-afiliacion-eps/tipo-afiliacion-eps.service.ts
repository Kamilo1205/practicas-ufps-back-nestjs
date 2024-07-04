import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoAfiliacionEps } from './entities/tipo-afiliacion-eps.entity';
import { CreateTipoAfiliacionEpsDto, UpdateTipoAfiliacionEpsDto } from './dto';
import { TipoAfiliacionEpsExistsException, TipoAfiliacionEpsNotFoundException } from './exceptions';

@Injectable()
export class TipoAfiliacionEpsService {
  constructor(
    @InjectRepository(TipoAfiliacionEps)
    private tipoAfiliacionEpsRepository: Repository<TipoAfiliacionEps>,
  ) {}

  async create(createTipoAfiliacionEpsDto: CreateTipoAfiliacionEpsDto) {
    const { nombre } = createTipoAfiliacionEpsDto;
    const tipoAfiliacion = await this.tipoAfiliacionEpsRepository.findOneBy({ nombre });
    if (tipoAfiliacion) throw new TipoAfiliacionEpsExistsException(nombre);
    return this.tipoAfiliacionEpsRepository.save(createTipoAfiliacionEpsDto);
  }

  findAll() {
    return this.tipoAfiliacionEpsRepository.find();
  }

  async findOne(id: string) {
    const tipoAfiliacion = await this.tipoAfiliacionEpsRepository.findOneBy({ id });
    if (!tipoAfiliacion) throw new TipoAfiliacionEpsNotFoundException(id);
    return tipoAfiliacion;
  }

  async update(id: string, updateTipoAfiliacionEpsDto: UpdateTipoAfiliacionEpsDto) {
    const tipoAfiliacion = await this.tipoAfiliacionEpsRepository.findOneBy({ id });
    if (!tipoAfiliacion) throw new TipoAfiliacionEpsNotFoundException(id);

    const { nombre } = updateTipoAfiliacionEpsDto;
    if ( nombre && tipoAfiliacion.nombre != nombre) {
      const tipoAfiliacion = await this.tipoAfiliacionEpsRepository.findOneBy({ nombre });
      if (tipoAfiliacion) throw new TipoAfiliacionEpsExistsException(nombre);
    }
    await this.tipoAfiliacionEpsRepository.update(id, updateTipoAfiliacionEpsDto);
    return this.tipoAfiliacionEpsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const tipoAfiliacion = await this.tipoAfiliacionEpsRepository.findOneBy({ id });
    if (!tipoAfiliacion) throw new TipoAfiliacionEpsNotFoundException(id);
    return this.tipoAfiliacionEpsRepository.softDelete(tipoAfiliacion);
  }
}
