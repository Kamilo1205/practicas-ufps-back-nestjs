import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto, UpdatePermisoDto } from './dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-permiso')
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-permisos')
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-permiso')
  findOne(@Param() { id }: UuidDto) {
    return this.permisosService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-permiso')
  update(@Param() { id }: UuidDto, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-permiso')
  remove(@Param() { id }: UuidDto) {
    return this.permisosService.remove(id);
  }
}
