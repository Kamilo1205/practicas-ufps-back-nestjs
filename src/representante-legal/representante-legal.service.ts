import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { RepresentanteLegalExistsException, RepresentanteLegalNotFoundException } from './exceptions';
import { CiudadesService } from 'src/ciudades/ciudades.service';

@Injectable()
export class RepresentanteLegalService {
  constructor(
    @InjectRepository(RepresentanteLegal)
    private readonly representanteLegalRepository: Repository<RepresentanteLegal>,
    private readonly ciudadesService: CiudadesService
  ) {}

  async create(createRepresentanteLegalDto: CreateRepresentanteLegalDto) {
    const { numeroDocumento, lugarExpedicionDocumentoId } = createRepresentanteLegalDto;
    const representanteLegalExiste = await this.representanteLegalRepository.findOneBy({ numeroDocumento });
    if (representanteLegalExiste) throw new RepresentanteLegalExistsException(numeroDocumento);

    const lugarExpedicionDocumento = await this.ciudadesService.findOne(lugarExpedicionDocumentoId);
    const representanteLegal = this.representanteLegalRepository.create({ ...createRepresentanteLegalDto, lugarExpedicionDocumento });
    return this.representanteLegalRepository.save(representanteLegal);
  }

  findAll() {
    return this.representanteLegalRepository.find();
  }

  async findOne(id: string) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);
    return representanteLegal;
  }

  findOneByNumeroDocumento(numeroDocumento: string) {
    return this.representanteLegalRepository.findOneBy({ numeroDocumento });  
  }

  async update(id: string, updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);
    return this.representanteLegalRepository.update(id, updateRepresentanteLegalDto);
  }

  async remove(id: string) {
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ id });
    if (!representanteLegal) throw new RepresentanteLegalNotFoundException(id);
    return this.representanteLegalRepository.softDelete(representanteLegal);
  }
}
