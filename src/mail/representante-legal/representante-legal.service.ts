import { Injectable } from '@nestjs/common';
import { CreateRepresentanteLegalDto } from './dto/create-representante-legal.dto';
import { UpdateRepresentanteLegalDto } from './dto/update-representante-legal.dto';

@Injectable()
export class RepresentanteLegalService {
  create(createRepresentanteLegalDto: CreateRepresentanteLegalDto) {
    return 'This action adds a new representanteLegal';
  }

  findAll() {
    return `This action returns all representanteLegal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} representanteLegal`;
  }

  update(id: number, updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    return `This action updates a #${id} representanteLegal`;
  }

  remove(id: number) {
    return `This action removes a #${id} representanteLegal`;
  }
}
