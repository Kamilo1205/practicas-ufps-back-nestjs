import { Injectable } from '@nestjs/common';
import { CreateAreaSubAreaInteresDto, UpdateAreaSubAreaInteresDto } from './dto';

@Injectable()
export class AreaSubAreaInteresService {
  create(createAreaSubAreaInteresDto: CreateAreaSubAreaInteresDto) {
    return 'This action adds a new areaSubAreaIntere';
  }

  findAll() {
    return `This action returns all areaSubAreaInteres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} areaSubAreaIntere`;
  }

  update(id: number, updateAreaSubAreaInteresDto: UpdateAreaSubAreaInteresDto) {
    return `This action updates a #${id} areaSubAreaIntere`;
  }

  remove(id: number) {
    return `This action removes a #${id} areaSubAreaIntere`;
  }
}
