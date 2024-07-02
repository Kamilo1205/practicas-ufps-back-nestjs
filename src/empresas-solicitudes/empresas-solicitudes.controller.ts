import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
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

  @Get('empresa')
  @Roles(Rol.Empresa)
  findAllByEmpresa(@Paginate() query: PaginateQuery, @GetUser() usuario: Usuario) {
    return this.empresasSolicitudesService.findAllByEmpresaId(query, usuario);
  }

  @Get('empresa/:id')
  @Roles(Rol.Empresa)
  findOneByEmpresa(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.empresasSolicitudesService.findOneByEmpresaId(id, usuario);
  }

  @Delete('empresa/:id')
  @Roles(Rol.Empresa)
  removeByEmpresa(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.empresasSolicitudesService.removeByEmpresa(id, usuario);
  }

  @Get()
  @Roles(Rol.Administrador, Rol.Coordinador, Rol.Director)
  findAll(@Paginate() query: PaginateQuery) {
    return this.empresasSolicitudesService.findAll(query);
  }

  @Get(':id')
  @Roles(Rol.Administrador, Rol.Coordinador, Rol.Director)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasSolicitudesService.findOne(id);
  }

  @Delete(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasSolicitudesService.remove(id);
  }
}
