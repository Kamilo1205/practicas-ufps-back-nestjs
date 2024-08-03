import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto, UpdateComentarioDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Tutor, Rol.Administrador, Rol.Estudiante, Rol.Empresa)
  create(@Body() createComentarioDto: CreateComentarioDto, @GetUser() usuario: Usuario) {
    return this.comentariosService.create(createComentarioDto, usuario);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Tutor, Rol.Administrador, Rol.Estudiante, Rol.Empresa)
  update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto, @GetUser() usuario: Usuario) {
    return this.comentariosService.update(id, updateComentarioDto, usuario);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Tutor, Rol.Administrador, Rol.Estudiante, Rol.Empresa)
  remove(@Param('id') id: string, @GetUser() usuario: Usuario) {
    return this.comentariosService.remove(id, usuario);
  }
}
