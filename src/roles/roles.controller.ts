import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-rol')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-roles')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-rol')
  findOne(@Param() { id }: UuidDto) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-rol')
  update(@Param() { id }: UuidDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-rol')
  remove(@Param() { id }: UuidDto) {
    return this.rolesService.remove(id);
  }
}
