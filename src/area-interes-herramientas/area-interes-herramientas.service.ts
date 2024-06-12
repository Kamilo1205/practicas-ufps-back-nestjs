import { Injectable } from '@nestjs/common';
import { CreateAreaInteresHerramientaDto } from './dto/create-area-interes-herramienta.dto';
import { UpdateAreaInteresHerramientaDto } from './dto/update-area-interes-herramienta.dto';

@Injectable()
export class AreaInteresHerramientasService {
  create(createAreaInteresHerramientaDto: CreateAreaInteresHerramientaDto) {
    return 'This action adds a new areaInteresHerramienta';
  }

  findAll() {
    return `This action returns all areaInteresHerramientas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} areaInteresHerramienta`;
  }

  update(id: number, updateAreaInteresHerramientaDto: UpdateAreaInteresHerramientaDto) {
    return `This action updates a #${id} areaInteresHerramienta`;
  }

  remove(id: number) {
    return `This action removes a #${id} areaInteresHerramienta`;
  }
}
