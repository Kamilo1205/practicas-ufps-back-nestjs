import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.save(createRoleDto);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findOne(id: string, relations: string[] = ['permisos']) {
    return this.rolesRepository.findOne({
      where: { id },
      relations,
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(id, updateRoleDto);
  }

  remove(id: string) {
    return this.rolesRepository.softDelete({ id });
  }
}
