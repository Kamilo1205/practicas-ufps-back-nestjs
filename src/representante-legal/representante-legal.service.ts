import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepresentanteLegal } from './entities/representante-legal.entity';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { RepresentanteLegalExistsException, RepresentanteLegalNotFoundException } from './exceptions';

@Injectable()
export class RepresentanteLegalService {
  constructor(
    @InjectRepository(RepresentanteLegal)
    private readonly representanteLegalRepository: Repository<RepresentanteLegal>
  ) {}

  async create(createRepresentanteLegalDto: CreateRepresentanteLegalDto) {
    const { numeroDocumento } = createRepresentanteLegalDto;
    const representanteLegal = await this.representanteLegalRepository.findOneBy({ numeroDocumento });
    if (representanteLegal) throw new RepresentanteLegalExistsException(numeroDocumento);
    return this.representanteLegalRepository.save(createRepresentanteLegalDto);
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
