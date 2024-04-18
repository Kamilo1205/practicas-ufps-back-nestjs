import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.save(createRoleDto);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findOne(id: string) {
    return this.rolesRepository.findOne({ where: { id } });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(id, updateRoleDto);
  }

  remove(id: string) {
    return this.rolesRepository.softDelete({ id });
  }
}
