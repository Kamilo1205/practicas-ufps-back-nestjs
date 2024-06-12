import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto, UpdateDepartamentoDto } from './dto';
import { Departamento } from './entities/departamento.entity';
import { PaisesService } from 'src/paises/paises.service';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    private readonly paisesService: PaisesService
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const { nombre, paisId } = createDepartamentoDto;
    const pais = await this.paisesService.findOne(paisId);
    const departamentoExiste = await this.departamentoRepository.findOne({ where: { nombre, pais } });
    if (departamentoExiste) throw new ConflictException(`El departamento ${ nombre } ya esta registrado en el pais especificado`);

    const departamento = this.departamentoRepository.create({ nombre, pais })
    return this.departamentoRepository.save(departamento);
  }

  findAll() {
    return this.departamentoRepository.find({ relations: ['pais', 'ciudades'] });
  }

  async findOne(id: string) {
    const departamento = await this.departamentoRepository.findOne({ where: { id }, relations: ['pais', 'ciudades'] });
    if (!departamento) throw new NotFoundException(`El departamento con el id ${ id } no fue encontrado`);
    return departamento;
  }

  async findByPais(paisId: string) {
    const pais = await this.paisesService.findOne(paisId);
    return this.departamentoRepository.find({ where: { pais: { id: pais.id } } });
  }

  async findByPaisNombre(paisNombre: string) {
    const pais = await this.paisesService.findOneByNombre(paisNombre);
    return this.departamentoRepository.find({ where: { pais: { id: pais.id } } });
  }

  async update(id: string, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.departamentoRepository.findOne({ where: { id } });
    if (!departamento) throw new NotFoundException(`El departamento con el id ${ id } no fue encontrado`);

    const { nombre, paisId } = updateDepartamentoDto;
    if (paisId && departamento.pais.id != paisId) {
      const pais = await this.paisesService.findOne(paisId);
      departamento.pais = pais;
    }

    if (nombre && nombre !== departamento.nombre) {
      const departamentoConNombre = await this.departamentoRepository.findOne({ where: { nombre, pais: departamento.pais } });
      if (departamentoConNombre && departamentoConNombre.id !== id) {
        throw new ConflictException(`El nombre del país ${nombre} ya está en uso`);
      }
    }

    await this.departamentoRepository.update(id, updateDepartamentoDto);
    return this.departamentoRepository.findOne({ where: { id }, relations: ['pais', 'ciudades'] });
  }

  async remove(id: string) {
    const departamento = await this.departamentoRepository.findOne({ where: { id } });
    if (!departamento) throw new NotFoundException(`El departamento con el id ${ id } no fue encontrado`);
    return this.departamentoRepository.softRemove(departamento);
  }
}
