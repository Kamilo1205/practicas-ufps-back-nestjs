import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHerramientaDto, UpdateHerramientaDto } from './dto';
import { Herramienta } from './entities/herramienta.entity';

@Injectable()
export class HerramientasService {
  constructor(
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
  ) {}

  async create(createHerramientaDto: CreateHerramientaDto) {
    const herramientaExistente = await this.herramientaRepository.findOne({ where: { nombre: createHerramientaDto.nombre } });
    if (herramientaExistente) throw new ConflictException(`Ya existe una herramienta con el nombre ${createHerramientaDto.nombre}`);

    const herramienta = this.herramientaRepository.create(createHerramientaDto);
    return this.herramientaRepository.save(herramienta);
  }

  async findAll() {
    return this.herramientaRepository.find();
  }

  async findOne(id: string) {
    const herramienta = await this.herramientaRepository.findOne({ where: { id } });
    if (!herramienta) throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    return herramienta;
  }

  async findByIds(ids: string[]) {
    const herramientas = await this.herramientaRepository.find({ where: { id: In(ids) } });
    if (herramientas.length != ids.length) throw new NotFoundException('una o más herramientas no son validas');
    return herramientas;
  }

  async update(id: string, updateHerramientaDto: UpdateHerramientaDto) {
    const herramientaExistente = await this.herramientaRepository.findOne({ where: { id } });
    if (!herramientaExistente) throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);

    const herramientaDuplicada = await this.herramientaRepository.findOne({ where: { nombre: updateHerramientaDto.nombre } });
    if (herramientaDuplicada && herramientaDuplicada.id !== id) throw new ConflictException(`Ya existe una herramienta con el nombre ${updateHerramientaDto.nombre}`);

    const herramienta = await this.herramientaRepository.preload({
      id,
      ...updateHerramientaDto,
    });

    return this.herramientaRepository.save(herramienta);
  }

  async remove(id: string) {
    const herramienta = await this.herramientaRepository.findOne({ where: { id } });
    if (!herramienta) throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    await this.herramientaRepository.softRemove(herramienta);
  }
}
