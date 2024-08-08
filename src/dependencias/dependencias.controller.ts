import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { DependenciasService } from './dependencias.service';
import { CreateDependencia } from './dto/create-dependencia.dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('dependencias')
export class DependenciasController {
  constructor(private readonly dependenciaService: DependenciasService) {}

  @Post()
  @Roles(Rol.Dependencia)
  create(@Body() createDependencia: CreateDependencia, @GetUser() usuario: Usuario) {
    return this.dependenciaService.create(createDependencia, usuario);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador, Rol.Director)
  findAll() {
    return this.dependenciaService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador, Rol.Director)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dependenciaService.findOne(id);
  }
}
