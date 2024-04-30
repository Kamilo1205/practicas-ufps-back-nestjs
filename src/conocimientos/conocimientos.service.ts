import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConocimientoExistsException, ConocimientoNotFoundException } from './exceptions';
import { CreateConocimientoDto, UpdateConocimientoDto } from './dto';
import { Conocimiento } from './entities/conocimiento.entity';

@Injectable()
export class ConocimientosService {
  constructor(
    @InjectRepository(Conocimiento)
    private conocimientoRepository: Repository<Conocimiento>,
  ) {}

  async create(createConocimientoDto: CreateConocimientoDto) {
    const { nombre } = createConocimientoDto;
    const conocimiento = await this.conocimientoRepository.findOneBy({ nombre });
    if (conocimiento) throw new ConocimientoExistsException(nombre);
    return this.conocimientoRepository.create(createConocimientoDto);
  }

  findAll() {
    return this.conocimientoRepository.find();
  }

  async findOne(id: string) {
    const conocimiento = await this.conocimientoRepository.findOneBy({ id });
    if (!conocimiento) throw new ConocimientoNotFoundException(id);
    return conocimiento;
  }

  async update(id: string, updateConocimientoDto: UpdateConocimientoDto) {
    const conocimiento = await this.conocimientoRepository.findOneBy({ id });
    if (!conocimiento) throw new ConocimientoNotFoundException(id);
    
    const { nombre } = updateConocimientoDto;
    if (nombre && conocimiento.nombre != nombre) {
      const conocimiento = await this.conocimientoRepository.findOneBy({ nombre });
      if (conocimiento) throw new ConocimientoExistsException(nombre);
    }
    await this.conocimientoRepository.update(id, updateConocimientoDto);
    return this.conocimientoRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const conocimiento = await this.conocimientoRepository.findOneBy({ id });
    if (!conocimiento) throw new ConocimientoNotFoundException(id);
    return this.conocimientoRepository.softRemove(conocimiento);
  }
}
