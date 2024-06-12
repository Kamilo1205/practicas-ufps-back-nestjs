import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { CreateEstudianteAreaInteresDto, UpdateEstudianteAreaInteresDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('estudiante-area-interes')
export class EstudianteAreaInteresController {
  constructor(private readonly estudianteAreaInteresService: EstudianteAreaInteresService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createEstudianteAreaInteresDto: CreateEstudianteAreaInteresDto) {
    return this.estudianteAreaInteresService.create(createEstudianteAreaInteresDto);
  }

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

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id') id: string, @Body() updateEstudianteAreaInteresDto: UpdateEstudianteAreaInteresDto) {
    return this.estudianteAreaInteresService.update(id, updateEstudianteAreaInteresDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') id: string) {
    return this.estudianteAreaInteresService.remove(id);
  }
}
