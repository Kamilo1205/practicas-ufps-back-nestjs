import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEpsDto, UpdateEpsDto } from './dto';
import { Eps } from './entities/eps.entity';
import { EpsExistsException, EpsNotFoundException } from './exceptions';

@Injectable()
export class EpsService {
  constructor(
    @InjectRepository(Eps)
    private epsRepository: Repository<Eps>,
  ) {}

  async create(createEpsDto: CreateEpsDto) {
    const { nit } = createEpsDto;
    const existingEps = await this.epsRepository.findOneBy({ nit });
    if ( existingEps ) throw new EpsExistsException(nit);
    return this.epsRepository.create(createEpsDto);
  }

  findAll() {
    return this.epsRepository.find();
  }

  async findOne(id: string) {
    const eps = await this.epsRepository.findOneBy({ id });
    if ( !eps ) throw new EpsNotFoundException(id);
    return eps;
  }

  async update(id: string, updateEpsDto: UpdateEpsDto) {
    const eps = await this.epsRepository.findOneBy({ id });
    if ( !eps ) throw new EpsNotFoundException(id);
    return this.epsRepository.update(id, updateEpsDto);
  }

  async remove(id: string) {
    const eps = await this.epsRepository.findOneBy({ id });
    if ( !eps ) throw new EpsNotFoundException(id);
    return this.epsRepository.softDelete({ id });
  }
}
