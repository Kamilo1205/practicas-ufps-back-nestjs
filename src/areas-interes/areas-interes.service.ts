import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaInteresDto, UpdateAreaInteresDto } from './dto';
import { AreaInteres } from './entities/area-interes.entity';
import { AreaInteresExistsException, AreaInteresNotFoundException } from './exceptions';

@Injectable()
export class AreasInteresService {
  constructor(
    @InjectRepository(AreaInteres)
    private areaInteresRepository: Repository<AreaInteres>,
  ) {}

  async create(createAreaInteresDto: CreateAreaInteresDto) {
    const { nombre } = createAreaInteresDto;
    const areaInteres = await this.areaInteresRepository.findOneBy({ nombre });
    if ( areaInteres ) throw new AreaInteresExistsException(nombre);
    return this.areaInteresRepository.save(createAreaInteresDto);
  }

  findAll() {
    return this.areaInteresRepository.find();
  }

  async findOne(id: string) {
    const areaInteres = await this.areaInteresRepository.findOne({
      where: { id },
      relations: ['estudiantes'],
    });
    if ( !areaInteres ) throw new AreaInteresNotFoundException(id);
    return areaInteres;
  }

  async update(id: string, updateAreaInteresDto: UpdateAreaInteresDto) {
    const areaInteres = await this.areaInteresRepository.findOneBy({ id });
    if ( !areaInteres ) throw new AreaInteresNotFoundException(id);
    await this.areaInteresRepository.update(id, updateAreaInteresDto);
    return await this.areaInteresRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const areaInteres = await this.areaInteresRepository.findOneBy({ id });
    if (!areaInteres) throw new AreaInteresNotFoundException(id);
    return this.areaInteresRepository.remove(areaInteres);
  }
}
