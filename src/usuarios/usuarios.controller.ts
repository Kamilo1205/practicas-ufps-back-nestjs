import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AddPermisosDto, CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { Rol } from '../auth/enums/rol.enum';
import { Permisos, Roles } from 'src/auth/decorators';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-usuario')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-usuarios')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usuariosService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-usuario')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id/permisos')
  @Roles(Rol.Coordinador)
  @Permisos('agregar-permisos-usuario')
  addPermisos(@Param('id') id: string, @Body() addPermisosDto: AddPermisosDto) {
    return this.usuariosService.addPermisos(id, addPermisosDto.permisosIds);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-usuario')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-usuario')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
