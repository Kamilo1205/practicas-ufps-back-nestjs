import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaiseDto, UpdatePaiseDto } from './dto';
import { UuidDto } from 'src/common/dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createPaiseDto: CreatePaiseDto) {
    return this.paisesService.create(createPaiseDto);
  }

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.paisesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updatePaiseDto: UpdatePaiseDto) {
    return this.paisesService.update(id, updatePaiseDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.paisesService.remove(id);
  }
}
