import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SubActividadesService } from './sub-actividades.service';
import { CreateSubActividadDto, UpdateSubActividadDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('sub-actividades')
export class SubActividadesController {
  constructor(private readonly subActividadesService: SubActividadesService) {}

  @Post()
  @Roles(Rol.Estudiante)
  create(@Body() createSubActividadDto: CreateSubActividadDto, @GetUser() usuario: Usuario) {
    return this.subActividadesService.create(createSubActividadDto, usuario);
  }

  @Get(':id')
  @Roles(Rol.Estudiante)
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.subActividadesService.findOneByUsuario(id, usuario);
  }

  @Patch(':id')
  @Roles(Rol.Estudiante)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateSubActividadDto: UpdateSubActividadDto, @GetUser() usuario: Usuario) {
    return this.subActividadesService.update(id, updateSubActividadDto, usuario);
  }

  @Delete(':id')
  @Roles(Rol.Estudiante)
  remove(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.subActividadesService.remove(id, usuario);
  }
}
