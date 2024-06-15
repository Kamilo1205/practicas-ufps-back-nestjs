import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('estudiante-area-interes')
export class EstudianteAreaInteresController {
  constructor(private readonly estudianteAreaInteresService: EstudianteAreaInteresService) {}

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.estudianteAreaInteresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id') id: string) {
    return this.estudianteAreaInteresService.findOne(id);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') id: string) {
    return this.estudianteAreaInteresService.remove(id);
  }
}
