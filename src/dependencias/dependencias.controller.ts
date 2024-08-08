import { Body, Controller, Post } from '@nestjs/common';
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
}
