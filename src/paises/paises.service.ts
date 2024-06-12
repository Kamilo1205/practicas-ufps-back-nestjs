import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaiseDto, UpdatePaiseDto } from './dto';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  async create(createPaiseDto: CreatePaiseDto) {
    const { nombre } = createPaiseDto;
    const paisExiste = await this.paisRepository.findOne({ where: { nombre } });
    if (paisExiste) throw new ConflictException(`El pais ${ nombre } ya esta registrado`);

    return this.paisRepository.save(createPaiseDto);
  }

  findAll() {
    return this.paisRepository.find({ relations: ['departamentos', 'departamentos.ciudades'] });
  }

  async findOne(id: string) {
    const pais = await this.paisRepository.findOne({ where: { id } });
    if (!pais) throw new NotFoundException(`El pais con el id ${ id } no fue encontrado`);
    return pais;
  }

  async findOneByNombre(nombre: string) {
    const pais = await this.paisRepository.findOne({ where: { nombre } });
    if (!pais) throw new NotFoundException(`El pais ${ nombre } no fue encontrado`);
    return pais;
  }

  async update(id: string, updatePaiseDto: UpdatePaiseDto) {
    const pais = await this.paisRepository.findOne({ where: { id } });
    if (!pais) throw new NotFoundException(`El pais con el id ${ id } no fue encontrado`);

    const { nombre } = updatePaiseDto;
    if (nombre && nombre !== pais.nombre) {
      const paisConNombre = await this.paisRepository.findOne({ where: { nombre } });
      if (paisConNombre && paisConNombre.id !== id) {
        throw new ConflictException(`El nombre del país ${nombre} ya está en uso`);
      }
    }

    await this.paisRepository.update(id, updatePaiseDto);
    return this.paisRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const pais = await this.paisRepository.findOne({ where: { id } });
    if (!pais) throw new NotFoundException(`El pais con el id ${ id } no fue encontrado`);
    return this.paisRepository.softRemove(pais);
  }
}
