import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { EmpresasSolicitudesService } from './empresas-solicitudes.service';
import { CreateEmpresaSolicitudDto, UpdateEmpresaSolicitudDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('empresas-solicitudes')
export class EmpresasSolicitudesController {
  constructor(private readonly empresasSolicitudesService: EmpresasSolicitudesService) {}

  @Post()
  @Roles(Rol.Empresa)
  create(@Body() createEmpresaSolicitudDto: CreateEmpresaSolicitudDto, @GetUser() usuario: Usuario) {
    return this.empresasSolicitudesService.create(createEmpresaSolicitudDto, usuario);
  }

  @Get()
  @Roles(Rol.Administrador, Rol.Coordinador, Rol.Director)
  findAll(@Paginate() query: PaginateQuery) {
    return this.empresasSolicitudesService.findAll(query);
  }

  @Get(':id')
  @Roles(Rol.Administrador, Rol.Coordinador, Rol.Director)
  findOne(@Param('id') id: string) {
    return this.empresasSolicitudesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  update(@Param('id') id: string, @Body() updateEmpresaSolicitudDto: UpdateEmpresaSolicitudDto) {
    return this.empresasSolicitudesService.update(id, updateEmpresaSolicitudDto);
  }

  @Delete(':id')
  @Roles(Rol.Empresa, Rol.Administrador, Rol.Coordinador)
  remove(@Param('id') id: string) {
    return this.empresasSolicitudesService.remove(id);
  }
}
