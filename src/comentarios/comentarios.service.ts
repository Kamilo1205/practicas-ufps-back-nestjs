import { Injectable } from '@nestjs/common';
import { CreateComentarioDto, UpdateComentarioDto } from './dto';
@Injectable()
export class ComentariosService {
  create(createComentarioDto: CreateComentarioDto) {
    return 'This action adds a new comentario';
  }

  findAll() {
    return `This action returns all comentarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
