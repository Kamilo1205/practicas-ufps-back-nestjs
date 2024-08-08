import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dependencia } from './entities/dependencia.entity';
import { Repository } from 'typeorm';
import { CreateDependencia } from './dto/create-dependencia.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class DependenciasService {
  constructor(
    @InjectRepository(Dependencia) private readonly dependenciaRepository: Repository<Dependencia>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createDependencia: CreateDependencia, usuario: Usuario) {
    const dependencia = this.dependenciaRepository.create({ ...createDependencia, usuario });
    const dependenciaGuardada = await this.dependenciaRepository.save(dependencia);
    await this.usuariosService.update(usuario.id, { estaRegistrado: true });
    return dependenciaGuardada;
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
