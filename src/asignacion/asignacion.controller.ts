import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { AsignarTutorDto } from './dto/asignar-tutor.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Post()
  @Roles(Rol.Administrador, Rol.Coordinador)
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @Get()
  @Roles(Rol.Administrador, Rol.Coordinador)
  findAll(@Paginate() query: PaginateQuery) {
    return this.asignacionService.findAll(query);
  }

  @Get(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.asignacionService.findOne(id);
  }

  @Patch(':id/asignar-tutor')
  @Roles(Rol.Empresa)
  asignarTutor(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario, asignarTutorDto: AsignarTutorDto) {
    return this.asignacionService.asignarTutor(id, usuario, asignarTutorDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.asignacionService.remove(id);
  }
}
