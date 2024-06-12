import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto, UpdateDepartamentoDto } from './dto';
import { UuidDto } from 'src/common/dto';
import { Rol } from 'src/auth/enums';
import { Roles } from 'src/auth/decorators';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get('pais/nombre/:paisNombre')
  findByPaisNombre(@Param('paisNombre') paisNombre: string) {
    return this.departamentosService.findByPaisNombre(paisNombre);
  }

  @Get('pais/:paisId')
  findByPais(@Param('paisId') paisId: string) {
    return this.departamentosService.findByPais(paisId);
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.departamentosService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentosService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.departamentosService.remove(id);
  }
}
