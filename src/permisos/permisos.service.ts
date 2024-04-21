import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermisoDto, UpdatePermisoDto } from './dto';
import { Permiso } from './entities/permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
  ) {}

  create(createPermisoDto: CreatePermisoDto) {
    return this.permisosRepository.save(createPermisoDto);
  }

  findAll() {
    return this.permisosRepository.find();
  }

  findOne(id: string) {
    return this.permisosRepository.findOne({ where: { id } });
  }

  update(id: string, updatePermisoDto: UpdatePermisoDto) {
    return this.permisosRepository.update(id, updatePermisoDto);
  }

  remove(id: string) {
    return this.permisosRepository.softDelete({ id });
  }

  async findByIds(ids: string[]) {
    const permisos = await this.permisosRepository.findBy({ id: In(ids) });
    if (permisos.length !== ids.length) {
      // Lanzar una excepción si algún ID no devuelve un permiso
      throw new NotFoundException(
        `Uno o más permisos no se pudieron encontrar.`,
      );
    }
    return permisos;
  }
}
