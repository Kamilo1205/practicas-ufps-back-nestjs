import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIndustriaDto, UpdateIndustriaDto } from './dto';
import { Industria } from './entities/industria.entity';

@Injectable()
export class IndustriasService {
  constructor(
    @InjectRepository(Industria)
    private readonly industriaRepository: Repository<Industria>,
  ) {}

  async create(createIndustriaDto: CreateIndustriaDto) {
    const { nombre } = createIndustriaDto;
    const industriaExiste = await this.industriaRepository.findOne({ where: { nombre } });
    if (industriaExiste) throw new ConflictException(`La industria ${ nombre } ya está registrada`);

    return this.industriaRepository.save(createIndustriaDto);
  }

  findAll() {
    return this.industriaRepository.find({ withDeleted: true });
  }

  async findOne(id: string) {
    const insutria = await this.industriaRepository.findOne({ where: { id } });
    if (!insutria) throw new NotFoundException(`La insutria con el id ${id} no fue encontrada`);
    return insutria;
  }

  async update(id: string, updateIndustriaDto: UpdateIndustriaDto) {
    const ciudad = await this.industriaRepository.findOne({ where: { id } });
    if (!ciudad) throw new NotFoundException(`La insutria con el id ${id} no fue encontrada`);
  
    const { nombre } = updateIndustriaDto;
    if (nombre && nombre !== ciudad.nombre) {
      const insutriaConNombre = await this.industriaRepository.findOne({ where: { nombre } });
      if (insutriaConNombre && insutriaConNombre.id !== id) {
        throw new ConflictException(`El nombre de la insdustria ${nombre} ya está en uso en el departamento especificado`);
      }
    }

    await this.industriaRepository.update(id, updateIndustriaDto);
    return this.industriaRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const industria = await this.industriaRepository.findOne({ where: { id }, withDeleted: true });
    if (!industria) throw new NotFoundException(`La ciudad con el id ${id} no fue encontrada`);
    return this.industriaRepository.softRemove(industria);
  }
}
