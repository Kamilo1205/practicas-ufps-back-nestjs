import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { CreatePermisoDto, UpdatePermisoDto } from './dto';
import { PermisoExistsException, PermisoNombreNotFoundException, PermisoNotFoundException } from './exceptions';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto) {
    const { nombre } = createPermisoDto;
    const existingPermiso = await this.permisosRepository.findOneBy({ nombre });
    if (existingPermiso) throw new PermisoExistsException(nombre); 
    
    return this.permisosRepository.save(createPermisoDto);
  }

  findAll(relations: string[] = []) {
    return this.permisosRepository.find({ relations });
  }

  async findOne(id: string, relations: string[] = []) {
    const permiso = await this.permisosRepository.findOne({ where: { id }, relations });
    if (!permiso) throw new PermisoNotFoundException(id);
    return permiso;
  }

  async findOneByNombre(nombre: string, relations: string[] = []) {
    const permiso = await this.permisosRepository.findOne({ where: { nombre }, relations });
    if (!permiso) throw new PermisoNombreNotFoundException(nombre);
    return permiso;
  }

  findByIds(ids: string[]) {
    return this.permisosRepository.findBy({ id: In(ids) });  ;  
  };

  async update(id: string, updatePermisoDto: UpdatePermisoDto) {
    const permiso = await this.permisosRepository.findOneBy({ id });
    if (!permiso) throw new PermisoNotFoundException(id);

    const { nombre } = updatePermisoDto;
    if (nombre && permiso.nombre != nombre) {
      const permiso = await this.permisosRepository.findOneBy({ nombre });
      if (permiso) throw new PermisoExistsException(nombre);
    } 
    await this.permisosRepository.update(id, updatePermisoDto);
    return this.permisosRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const permiso = await this.permisosRepository.findOneBy({ id });
    if (!permiso) throw new PermisoNotFoundException(id);
    return this.permisosRepository.softDelete(permiso);
  }
}
