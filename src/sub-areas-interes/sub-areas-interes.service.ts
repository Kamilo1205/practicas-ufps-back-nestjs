import { Injectable } from '@nestjs/common';
import { CreateSubAreasInteresDto, UpdateSubAreasInteresDto } from './dto';

@Injectable()
export class SubAreasInteresService {
  create(createSubAreasInteresDto: CreateSubAreasInteresDto) {
    return 'This action adds a new subAreasIntere';
  }

  findAll() {
    return `This action returns all subAreasInteres`;
  }

  findOne(id: string) {
    return `This action returns a #${id} subAreasIntere`;
  }

  update(id: string, updateSubAreasInteresDto: UpdateSubAreasInteresDto) {
    return `This action updates a #${id} subAreasIntere`;
  }

  remove(id: string) {
    return `This action removes a #${id} subAreasIntere`;
  }
}
