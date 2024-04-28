import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Rol } from './entities/rol.entity';
import { RolExistsException, RolNotFoundException } from './exceptions';
import { PermisosService } from 'src/permisos/permisos.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
    private readonly permisosService: PermisosService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { nombre, permisosIds } = createRoleDto;
    const existingRol = await this.rolesRepository.findOneBy({ nombre });
    if (existingRol) throw new RolExistsException(nombre);

    const permisos = permisosIds ? await this.permisosService.findByIds(permisosIds) : [];
    
    const rol = this.rolesRepository.create({
      ...createRoleDto,
      permisos 
    });
    return this.rolesRepository.save(rol);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: string) {
    const rol = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permisos', 'usuarios'],
    });
    if ( !rol ) throw new RolNotFoundException(id);
    return rol;
  }

  findOneByNombre(nombre: string) {
    return this.rolesRepository.findOneBy({ nombre });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const existingRol = await this.rolesRepository.findOneBy({ id });
    if ( !existingRol ) throw new RolNotFoundException(id);

    const { nombre, permisosIds } = updateRoleDto;
    if (nombre && existingRol.nombre != nombre) {
      const existingRolByNombre = await this.rolesRepository.findOneBy({ nombre });
      if (existingRolByNombre) throw new RolExistsException(nombre);
    }

    if (permisosIds) {
      const permisos = await this.permisosService.findByIds(permisosIds);
      const rol = this.rolesRepository.create({ id, ...updateRoleDto, permisos }); 
      await this.rolesRepository.save(rol);
    }
    else {
      await this.rolesRepository.update(id, updateRoleDto);
    }
    return await this.rolesRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if ( !rol ) throw new RolNotFoundException(id);
    return this.rolesRepository.softDelete({ id });
  }
}
