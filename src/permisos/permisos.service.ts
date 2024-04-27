import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermisoDto, UpdatePermisoDto } from './dto';
import { Permiso } from './entities/permiso.entity';
import { PermisoExistsException, PermisoNotFoundException, PermisosNotFoundException } from './exceptions';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto) {
    const { nombre } = createPermisoDto;
    const permiso = await this.permisosRepository.findOneBy({ nombre });
    if (permiso) throw new PermisoExistsException(nombre);
    return this.permisosRepository.save(createPermisoDto);
  }

  findAll() {
    return this.permisosRepository.find();
  }

  findOne(id: string) {
    return this.permisosRepository.findOneBy({ id });
  }

  async update(id: string, updatePermisoDto: UpdatePermisoDto) {
    const permiso = await this.permisosRepository.findOneBy({ id });
    if (!permiso) throw new PermisoNotFoundException(id);

    const { nombre } = updatePermisoDto;
    if (nombre && permiso.nombre) {
      const permiso = await this.permisosRepository.findOneBy({ nombre });
      if (permiso) throw new PermisoExistsException(nombre);
    }
    await this.permisosRepository.update(id, updatePermisoDto);
    return this.permisosRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const permiso = await this.permisosRepository.findOneBy({ id });
    if (!permiso) throw new PermisoNotFoundException(id);
    return this.permisosRepository.softDelete({ id });
  }

  async findByIds(ids: string[]) {
    const permisos = await this.permisosRepository.findBy({ id: In(ids) });
    const foundIds = permisos.map((permiso) => permiso.id);
    const notFoundIds = ids.filter((id) => !foundIds.includes(id));
    if (notFoundIds.length > 0) {
      throw new PermisosNotFoundException(notFoundIds);
    }
    return permisos;
  }
}
