import { Injectable } from '@nestjs/common';
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
    return this.decanosRepository.find();
  }

  async findOne() {
    const decanos = await this.decanosRepository.find();
    return decanos.length > 0 ? decanos[0] : undefined;
  }

  findOneById(id: string) {
    return this.decanosRepository.findOneBy({ id });
  }

  update(id: string, updateDecanoDto: UpdateDecanoDto) {
    return this.decanosRepository.update(id, updateDecanoDto);
  }

  remove(id: string) {
    return this.decanosRepository.softDelete(id);
  }
}
