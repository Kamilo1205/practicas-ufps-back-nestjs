import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDecanoDto } from './dto/create-decano.dto';
import { UpdateDecanoDto } from './dto/update-decano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Decano } from './entities/decano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DecanoService {
  constructor(
    @InjectRepository(Decano) 
    private readonly decanosRepository: Repository<Decano>,
  ) {}

  create(createDecanoDto: CreateDecanoDto) {
    return this.decanosRepository.save(createDecanoDto);
  }

  findAll() {
    return this.decanosRepository.find({ withDeleted: true });
  }

  async findOne() {
    const decanos = await this.decanosRepository.find();
    return decanos.length > 0 ? decanos[0] : undefined;
  }

  async findOneById(id: string) {
    const decano = await this.decanosRepository.findOne({ where: { id } });
    if (!decano) throw new NotFoundException(`El decano con el id ${id} no fue encontrado`);
    return decano;
  }

  async update(id: string, updateDecanoDto: UpdateDecanoDto) {
    const decano = await this.decanosRepository.findOne({ where: { id } });
    if (!decano) throw new NotFoundException(`El decano con el id ${id} no fue encontrado`);
    return this.decanosRepository.update(id, updateDecanoDto);
  }

  async remove(id: string) {
    const decano = await this.decanosRepository.findOne({ where: { id } });
    if (!decano) throw new NotFoundException(`El decano con el id ${id} no fue encontrado`);
    return this.decanosRepository.softDelete(id);
  }

  async restore(id: string) {
    const decano = await this.decanosRepository.findOne({ where: { id }, withDeleted: true });
    if (!decano) throw new NotFoundException(`El decano con el id ${id} no fue encontrado`);
    return this.decanosRepository.restore(id);
  } 
}
