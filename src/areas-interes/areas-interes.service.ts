import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
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
    const { nombre, areaPadreId } = createAreaInteresDto;

    const areaInteresExiste = await this.areaInteresRepository.findOneBy({ nombre });
    if (areaInteresExiste) throw new ConflictException('El área de interés con este nombre ya está registrada');

    let areaPadre: AreaInteres = null;
    if (areaPadreId) {
      areaPadre = await this.areaInteresRepository.findOneBy({ id: areaPadreId });
      if (!areaPadre) throw new NotFoundException('Área padre no encontrada');
    }

    const areaInteres = this.areaInteresRepository.create({
      nombre,
      areaPadre,
    });
    return this.areaInteresRepository.save(areaInteres);
  }

  findAll() {
    return this.areaInteresRepository.find({ relations: ['areaPadre', 'subAreas', 'subAreas.areaInteresHerramientas.herramienta', 'areaInteresHerramientas.herramienta'] });
  }

  async findOne(id: string) {
    const areaInteres = await this.areaInteresRepository.findOne({ where: { id }, relations: ['areaPadre', 'subAreas'] });
    if (!areaInteres) throw new NotFoundException('Área de interés no encontrada');
    return areaInteres;
  }

  async findByIds(ids: string[]) {
    const areasInteres = await this.areaInteresRepository.find({ where: { id: In(ids) }, relations: ['areaPadre', 'subAreas'] });
    if (areasInteres.length != ids.length) throw new NotFoundException('una o más areas de interes no son validas');
    return areasInteres;
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
    const areaInteres = await this.areaInteresRepository.findOne({  where: { id } });
    if (!areaInteres) throw new NotFoundException('Área de interés no encontrada');

    const { nombre, areaPadreId } = updateAreaInteresDto;

    if (areaPadreId && areaPadreId === id) throw new ConflictException('El área de interés no puede ser su propia área padre');
    
    let areaPadre: AreaInteres = null;
    if (areaPadreId && areaPadreId !== areaInteres.areaPadre?.id) {
      areaPadre = await this.areaInteresRepository.findOne({ where: { id: areaPadreId } });
      if (!areaPadre) throw new NotFoundException('Área padre no encontrada');
    }

    // Verificar si el nombre ya está registrado y no es el mismo área actual
    if (nombre && nombre !== areaInteres.nombre) {
      const existingAreaInteres = await this.areaInteresRepository.findOneBy({ nombre });
      if (existingAreaInteres) throw new ConflictException('El área de interés con este nombre ya está registrada');
      areaInteres.nombre = nombre;
    }

    areaInteres.areaPadre = areaPadre !== undefined ? areaPadre : areaInteres.areaPadre;
    return this.areaInteresRepository.save(areaInteres);
  }

  async remove(id: string) {
    const areaInteres = await this.areaInteresRepository.findOneBy({ id });
    if (!areaInteres) throw new NotFoundException('Área de interés no encontrada');
    return this.areaInteresRepository.softDelete(id);
  }

  async restore(id: string) {
    const areaInteres = await this.areaInteresRepository.findOne({ where: { id }, withDeleted: true });
    if (!areaInteres) throw new NotFoundException('Área de interés no encontrada');return this.areaInteresRepository.restore(id);
  }
}
