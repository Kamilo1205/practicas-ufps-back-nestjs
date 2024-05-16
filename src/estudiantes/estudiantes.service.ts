import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  create(createEstudianteDto: CreateEstudianteDto, usuario: Usuario) {
    const estudiante = this.estudianteRepository.create({ ...createEstudianteDto, usuario });
    return this.estudianteRepository.save(estudiante);
  }

  findAll() {
    return this.estudianteRepository.find();
  }

  findOne(id: string) {
    return this.estudianteRepository.findBy({ id });
  }

  update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteRepository.update(id, updateEstudianteDto);
  }

  remove(id: string) {
    return this.estudianteRepository.softDelete({ id });
  }
}
