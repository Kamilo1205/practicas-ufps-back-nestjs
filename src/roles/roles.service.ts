import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Rol } from './entities/rol.entity';
import { RolExistsException, RolNotFoundException } from './exceptions';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { nombre } = createRoleDto;
    const rol = await this.rolesRepository.findOneBy({ nombre });
    if (rol) throw new RolExistsException(nombre);
    return this.rolesRepository.save(createRoleDto);
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

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if ( !rol ) throw new RolNotFoundException(id);
    return this.rolesRepository.update(id, updateRoleDto);
  }

  async remove(id: string) {
    const rol = await this.rolesRepository.findOneBy({ id });
    if ( !rol ) throw new RolNotFoundException(id);
    return this.rolesRepository.softDelete({ id });
  }
}
