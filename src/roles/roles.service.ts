import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RolExistsException, RolNombreNotFoundException, RolNotFoundException } from './exceptions';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { nombre } = createRoleDto;
    const existingRol = await this.rolesRepository.findOneBy({ nombre });
    if (existingRol) throw new RolExistsException(nombre);
    
    const rol = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(rol);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: string, relations: string[] = ['permisos', 'usuarios']) {
    const rol = await this.rolesRepository.findOne({ where: { id }, relations });
    if ( !rol ) throw new RolNotFoundException(id);
    return rol;
  }

  async findOneByNombre(nombre: string) {
    const rol = await this.rolesRepository.findOneBy({ nombre });
    if (!rol) throw new RolNombreNotFoundException(nombre);
    return rol;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if (!rol) throw new RolNotFoundException(id);

    const { nombre } = updateRoleDto;
    if (nombre && rol.nombre != nombre) {
      const rol = await this.rolesRepository.findOneBy({ nombre });
      if (rol) throw new RolExistsException(nombre);
    }

    await this.rolesRepository.update(id, updateRoleDto);
    return await this.rolesRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if ( !rol ) throw new RolNotFoundException(id);
    return this.rolesRepository.softDelete({ id });
  }
}
