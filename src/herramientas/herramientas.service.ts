import { Injectable } from '@nestjs/common';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';

@Injectable()
export class HerramientasService {
  create(createHerramientaDto: CreateHerramientaDto) {
    return 'This action adds a new herramienta';
  }

  findAll() {
    return `This action returns all herramientas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} herramienta`;
  }

  update(id: string, updateHerramientaDto: UpdateHerramientaDto) {
    return `This action updates a #${id} herramienta`;
  }

  remove(id: string) {
    return `This action removes a #${id} herramienta`;
  }
}
