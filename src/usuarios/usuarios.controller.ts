import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { UsuariosService } from './usuarios.service';
import { Roles } from 'src/auth/decorators';
import { Rol } from '../auth/enums';
import { UuidDto } from 'src/common/dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(Rol.Coordinador)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usuariosService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  findOne(@Param() { id }: UuidDto) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  update(@Param() { id }: UuidDto, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  remove(@Param() { id }: UuidDto) {
    return this.usuariosService.remove(id);
  }
}
