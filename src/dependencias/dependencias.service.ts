import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dependencia } from './entities/dependencia.entity';
import { Repository } from 'typeorm';
import { CreateDependencia } from './dto/create-dependencia.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class DependenciasService {
  constructor(@InjectRepository(Dependencia) private readonly dependenciaRepository: Repository<Dependencia>) {}

  create(createDependencia: CreateDependencia, usuario: Usuario) {
    const dependencia = this.dependenciaRepository.create({ ...createDependencia, usuario });
    return this.dependenciaRepository.save(dependencia);
  }

  findAll() {
    return this.dependenciaRepository.find();
  }

  async findOne(id: string) {
    const dependencia = await this.dependenciaRepository.findOne({ where: { id } });
    if (!dependencia) throw new NotFoundException(`Dependencia con id ${id} no encontrado`);
    return dependencia;
  }
}
