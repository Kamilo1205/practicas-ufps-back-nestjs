import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
    return this.permisosRepository.find({ where: { id } });
  }

  update(id: string, updatePermisoDto: UpdatePermisoDto) {
    return this.permisosRepository.update(id, updatePermisoDto);
  }

  remove(id: string) {
    return this.permisosRepository.softDelete({ id });
  }
}
