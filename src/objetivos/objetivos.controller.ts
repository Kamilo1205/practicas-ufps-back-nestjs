import { Controller, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { ObjetivosService } from './objetivos.service';
import { CreateObjetivoDto, UpdateObjetivoDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('objetivos')
export class ObjetivosController {
  constructor(private readonly objetivosService: ObjetivosService) {}

  @Post()
  @Roles(Rol.Estudiante)
  create(@Body() createObjetivoDto: CreateObjetivoDto, @GetUser() usuario: Usuario) {
    return this.objetivosService.create(createObjetivoDto, usuario);
  }

  @Patch(':id')
  @Roles(Rol.Estudiante)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateObjetivoDto: UpdateObjetivoDto, @GetUser() usuario: Usuario) {
    return this.objetivosService.update(id, updateObjetivoDto, usuario);
  }
}
