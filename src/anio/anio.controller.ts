import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnioService } from './anio.service';
import { CreateAnioDto, UpdateAnioDto } from './dto/';
import { UuidDto } from 'src/common/dto';
import { Roles } from 'src/auth/decorators';
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
  findAll() {
    return this.anioService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.anioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id') { id }: UuidDto, @Body() updateAnioDto: UpdateAnioDto) {
    return this.anioService.update(id, updateAnioDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') { id }: UuidDto) {
    return this.anioService.remove(id);
  }
}
