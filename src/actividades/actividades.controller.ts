import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto, UpdateActividadeDto } from './dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  @Roles(Rol.Estudiante)
  create(@Body() createActividadeDto: CreateActividadeDto, @GetUser() usuario: Usuario) {
    return this.actividadesService.create(usuario, createActividadeDto);
  }

  @Get(':id')
  @Roles(Rol.Estudiante)
  findOne(@Param('id') id: string, @GetUser() usuario: Usuario) {
    return this.actividadesService.findOne(id, usuario);
  }

  @Patch(':id')
  @Roles(Rol.Estudiante)
  update(@Param('id') id: string, @GetUser() usuario: Usuario, @Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(id, usuario, updateActividadeDto);
  }

  @Delete(':id')
  @Roles(Rol.Estudiante)
  remove(@Param('id') id: string, @GetUser() usuario: Usuario) {
    return this.actividadesService.remove(id, usuario);
  }
}
