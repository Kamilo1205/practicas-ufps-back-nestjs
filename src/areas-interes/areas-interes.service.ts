import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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
    if (areaInteres) throw new AreaInteresExistsException(nombre);
    return this.areaInteresRepository.save(createAreaInteresDto);
  }

  findAll() {
    return this.areaInteresRepository.find({ relations: ['areaPadre', 'subAreas', 'subAreas.areaInteresHerramientas.herramienta', 'areaInteresHerramientas.herramienta'] });
  }

  async findOne(id: string, relations: string[] = []) {
    const areaInteres = await this.areaInteresRepository.findOne({ where: { id }, relations });
    if (!areaInteres) throw new AreaInteresNotFoundException(id);
    return areaInteres;
  }

  async findSubAreasByAreaId(id: string) {
    const areaInteres = await this.areaInteresRepository.findOne({ where: { id }, relations: ['areaSubArea', 'areaSubArea.subAreasInteres'] });
    if (!areaInteres) throw new AreaInteresNotFoundException(id);
    return areaInteres?.subAreas || [];
  }

  async findAreasSinSubAreas() {
    return this.areaInteresRepository.find({
      where: { subAreas: IsNull() },
      relations: ['subAreas'],
    });
  }

  async update(id: string, updateAreaInteresDto: UpdateAreaInteresDto) {
    const areaInteres = await this.areaInteresRepository.findOneBy({ id });
    if (!areaInteres) throw new AreaInteresNotFoundException(id);
    
    const { nombre } = updateAreaInteresDto;
    if (nombre && areaInteres.nombre != nombre) {
      const areaInteres = await this.areaInteresRepository.findOneBy({ nombre });
      if (areaInteres) throw new AreaInteresExistsException(nombre);
    }
    
    await this.areaInteresRepository.update(id, updateAreaInteresDto);
    return this.areaInteresRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const areaInteres = await this.areaInteresRepository.findOneBy({ id });
    if (!areaInteres) throw new AreaInteresNotFoundException(id);
    return this.areaInteresRepository.softDelete(areaInteres);
  }
}
