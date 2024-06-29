import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto, UpdateCiudadDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadesService.create(createCiudadDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.ciudadesService.findAll(query);
  }

  @Get('departamento/:departamentoId')
  findByDepartamento(@Param('departamentoId') departamentoId: string) {
    return this.ciudadesService.findByDepartamento(departamentoId);
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ciudadesService.findOne(id);
  }

  @Patch(':id/restore')
  @Roles(Rol.Coordinador, Rol.Administrador)
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ciudadesService.restore(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadesService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ciudadesService.remove(id);
  }
}
