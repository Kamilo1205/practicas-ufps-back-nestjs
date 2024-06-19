import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCiudadDto, UpdateCiudadDto } from './dto';
import { Ciudad } from './entities/ciudad.entity';
import { DepartamentosService } from 'src/departamentos/departamentos.service';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    private readonly departamentosService: DepartamentosService
  ) {}

  async create(createCiudadDto: CreateCiudadDto) {
    const { nombre, departamentoId } = createCiudadDto;
    const departamento = await this.departamentosService.findOne(departamentoId);
    
    const ciudadExiste = await this.ciudadRepository.findOne({ where: { nombre, departamento } });
    if (ciudadExiste) throw new ConflictException(`La ciudad ${nombre} ya está registrada en el departamento especificado`);

    const ciudad = this.ciudadRepository.create({ nombre, departamento });
    return this.ciudadRepository.save(ciudad);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.ciudadRepository, {
      sortableColumns: ['id', 'nombre', 'codigoGubernamental', 'fechaCreacion', 'fechaActualizacion', 'fechaEliminacion', 'departamento.nombre', 'departamento.pais.nombre'],
      nullSort: 'last',
      searchableColumns: ['nombre'],
      select: ['id', 'nombre', 'codigoGubernamental', 'fechaCreacion', 'fechaActualizacion', 'fechaEliminacion', 'departamento.id', 'departamento.nombre', 'departamento.pais.id', 'departamento.pais.nombre'],
      relations: ['departamento', 'departamento.pais', 'empresas', 'representantesLegales'],
      withDeleted: true,
      filterableColumns: {
        nombre: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        "departamento.id": [FilterOperator.EQ],
        "departamento.nombre": [FilterOperator.EQ, FilterOperator.CONTAINS]
      },
    });
  } 

  async findOne(id: string) {
    const ciudad = await this.ciudadRepository.findOne({ where: { id }, relations: ['departamento', 'departamento.pais'] });
    if (!ciudad) throw new NotFoundException(`La ciudad con el id ${id} no fue encontrada`);
    return ciudad;
  }

  async findByDepartamento(departamentoId: string) {
    const departamento = await this.departamentosService.findOne(departamentoId);
    return this.ciudadRepository.find({ where: { departamento: { id: departamento.id } } });
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto) {
    const ciudad = await this.ciudadRepository.findOne({ where: { id } });
    if (!ciudad) throw new NotFoundException(`La ciudad con el id ${id} no fue encontrada`);

    const { nombre, departamentoId } = updateCiudadDto;
    if (departamentoId && ciudad.departamento.id != departamentoId) {
      const departamento = await this.departamentosService.findOne(departamentoId);
      ciudad.departamento = departamento;
    }

    if (nombre && nombre !== ciudad.nombre) {
      const ciudadConNombre = await this.ciudadRepository.findOne({ where: { nombre, departamento: ciudad.departamento } });
      if (ciudadConNombre && ciudadConNombre.id !== id) {
        throw new ConflictException(`El nombre de la ciudad ${nombre} ya está en uso en el departamento especificado`);
      }
    }

    await this.ciudadRepository.update(id, updateCiudadDto);
    return this.ciudadRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const ciudad = await this.ciudadRepository.findOne({ where: { id } });
    if (!ciudad) throw new NotFoundException(`La ciudad con el id ${id} no fue encontrada`);
    return this.ciudadRepository.softRemove(ciudad);
  }
}
