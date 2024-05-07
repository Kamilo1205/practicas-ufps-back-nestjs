import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { UuidDto } from 'src/common/dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @Roles(Rol.Coordinador)
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  findOne(@Param() { id }: UuidDto) {
    return this.permisosService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  update(@Param() { id }: UuidDto, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  remove(@Param() { id }: UuidDto) {
    return this.permisosService.remove(id);
  }
}
