import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RolExistsException, RolNombreNotFoundException, RolNotFoundException } from './exceptions';
import { Rol } from './entities/rol.entity';
import { PermisosService } from 'src/permisos/permisos.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
    private readonly permisosService: PermisosService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { nombre } = createRoleDto;
    const existingRol = await this.rolesRepository.findOneBy({ nombre });
    if (existingRol) throw new RolExistsException(nombre);

    const permisos = await this.permisosService.findByIds(createRoleDto.permisosIds);
    const rol = this.rolesRepository.create({ ...createRoleDto, permisos });
    return this.rolesRepository.save(rol);
  }

  async addPermisos(id: string, permisosIds: string[]) {
    const existingRol = await this.rolesRepository.findOne({ where: { id }, relations: ['permisos'] });
    if (!existingRol) throw new RolNotFoundException(id);
    const permisosAgregar = await this.permisosService.findByIds(permisosIds);
    const permisos = [...existingRol.permisos, ...permisosAgregar];
    const rol = this.rolesRepository.create({ ...existingRol, permisos });
    return this.rolesRepository.save(rol);
  }

  async removePermisos(id: string, permisosIds: string[]) {
    const existingRol = await this.rolesRepository.findOne({ where: { id }, relations: ['permisos'] });
    if (!existingRol) throw new RolNotFoundException(id);
    const permisos = existingRol.permisos.filter(permiso => !permisosIds.includes(permiso.id));
    const rol = this.rolesRepository.create({ ...existingRol, permisos });
    return this.rolesRepository.save(rol);
  }

  findAll(relations: string[] = ['permisos']) {
    return this.rolesRepository.find({ relations });
  }

  async findOne(id: string, relations: string[] = ['permisos']) {
    const rol = await this.rolesRepository.findOne({ where: { id }, relations });
    if (!rol) throw new RolNotFoundException(id);
    return rol;
  }

  findByIds(ids: string[]) {
    return this.rolesRepository.findBy({ id: In(ids) });  
  };

  async findOneByNombre(nombre: string, relations: string[] = ['permisos']) {
    const rol = await this.rolesRepository.findOne({ where: { nombre }, relations });
    if (!rol) throw new RolNombreNotFoundException(nombre);
    return rol;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if (!rol) throw new RolNotFoundException(id);

    const { nombre, permisosIds } = updateRoleDto;
    if (nombre && rol.nombre != nombre) {
      const rol = await this.rolesRepository.findOneBy({ nombre });
      if (rol) throw new RolExistsException(nombre);
    }

    if (permisosIds) {
      const permisos = await this.permisosService.findByIds(permisosIds);
      const rolActualizar = this.rolesRepository.create({ ...rol, ...updateRoleDto, permisos });
      await this.rolesRepository.save(rolActualizar);
    } else {
      await this.rolesRepository.update(id, updateRoleDto);
    }

    return await this.rolesRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if ( !rol ) throw new RolNotFoundException(id);
    return this.rolesRepository.softDelete(rol);
  }
}
