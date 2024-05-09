import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(Rol.Administrador)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles(Rol.Administrador)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.rolesService.remove(id);
  }
}
