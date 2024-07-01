import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTutorInstitucionalDto, UpdateTutorInstitucionalDto } from './dto';
import { TutorInstitucional } from './entities/tutor-institucional.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class TutorInstitucionalService {
  constructor(
    @InjectRepository(TutorInstitucional)
    private readonly tutorInstitucionalRepository: Repository<TutorInstitucional>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createTutorInstitucionalDto: CreateTutorInstitucionalDto) {
    const { nombres, apellidos, email } = createTutorInstitucionalDto;
    const tutorInstitucional = await this.tutorInstitucionalRepository.save(createTutorInstitucionalDto);
    await this.usuariosService.createTutorInstitucional(email, `${nombres} ${apellidos}`);
    return tutorInstitucional;
  }

  findAll() {
    return this.tutorInstitucionalRepository.find({ withDeleted: true });
  }

  async findOne(id: string) {
    const tutorInstitucional = await this.tutorInstitucionalRepository.findOne({ where: { id }, withDeleted: true  });
    if (!tutorInstitucional) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return tutorInstitucional;
  }

  async update(id: string, updateTutorInstitucionalDto: UpdateTutorInstitucionalDto) {
    const tutorInstitucional = await this.tutorInstitucionalRepository.findOne({ where: { id }, withDeleted: true  });
    if (!tutorInstitucional) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return this.tutorInstitucionalRepository.update(id, updateTutorInstitucionalDto);
  }

  async remove(id: string) {
    const tutorInstitucional = await this.tutorInstitucionalRepository.findOne({ where: { id }, withDeleted: true  });
    if (!tutorInstitucional) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return this.tutorInstitucionalRepository.softDelete(id);
  }

  async restore(id: string) {
    const tutorInstitucional = await this.tutorInstitucionalRepository.findOne({ where: { id }, withDeleted: true  });
    if (!tutorInstitucional) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return this.tutorInstitucionalRepository.restore(id);
  }
}
