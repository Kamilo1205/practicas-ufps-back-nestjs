import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { CreateEstudianteAreaIntereDto, UpdateEstudianteAreaIntereDto } from './dto/';
import { UuidDto } from 'src/common/dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('estudiante-area-interes')
export class EstudianteAreaInteresController {
  constructor(private readonly estudianteAreaInteresService: EstudianteAreaInteresService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-estudiante-area-interes')
  create(@Body() createEstudianteAreaIntereDto: CreateEstudianteAreaIntereDto) {
    return this.estudianteAreaInteresService.create(createEstudianteAreaIntereDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-estudiantes-areas-interes')
  findAll() {
    return this.estudianteAreaInteresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-estudiante-areas-interes')
  findOne(@Param() { id }: UuidDto) {
    return this.estudianteAreaInteresService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-estudiante-area-interes')
  update(@Param() { id }: UuidDto, @Body() updateEstudianteAreaIntereDto: UpdateEstudianteAreaIntereDto) {
    return this.estudianteAreaInteresService.update(id, updateEstudianteAreaIntereDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-estudiante-area-interes')
  remove(@Param() { id }: UuidDto) {
    return this.estudianteAreaInteresService.remove(id);
  }
}
