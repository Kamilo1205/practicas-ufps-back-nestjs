import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { IntensidadHorariaService } from './intensidad-horaria.service';
import { CreateIntensidadHorariaDto, UpdateIntensidadHorariaDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('intensidad-horaria')
export class IntensidadHorariaController {
  constructor(private readonly intensidadHorariaService: IntensidadHorariaService) {}

  @Post()
  @Roles(Rol.Estudiante)
  create(@Body() createIntensidadHorariaDto: CreateIntensidadHorariaDto, @GetUser() usuario: Usuario) {
    return this.intensidadHorariaService.create(createIntensidadHorariaDto, usuario);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateIntensidadHorariaDto: UpdateIntensidadHorariaDto,
    @GetUser() usuario: Usuario
  ) {
    return this.intensidadHorariaService.update(id, updateIntensidadHorariaDto, usuario);
  }
}
