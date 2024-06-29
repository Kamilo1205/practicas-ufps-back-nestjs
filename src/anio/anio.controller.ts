import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AnioService } from './anio.service';
import { CreateAnioDto, UpdateAnioDto } from './dto/';
import { Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('anio')
export class AnioController {
  constructor(private readonly anioService: AnioService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createAnioDto: CreateAnioDto) {
    return this.anioService.create(createAnioDto);
  }

  @Get()
  @Public()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.anioService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.anioService.findOne(id);
  }

  @Patch(':id/restore')
  @Public()
  @Roles(Rol.Coordinador, Rol.Administrador)
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.anioService.restore(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAnioDto: UpdateAnioDto) {
    return this.anioService.update(id, updateAnioDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.anioService.remove(id);
  } 
}