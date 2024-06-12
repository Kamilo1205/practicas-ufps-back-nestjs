import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateIndustriaDto, UpdateIndustriaDto } from './dto';
import { IndustriasService } from './industrias.service';
import { UuidDto } from 'src/common/dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('industrias')
export class IndustriasController {
  constructor(private readonly industriasService: IndustriasService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createIndustriaDto: CreateIndustriaDto) {
    return this.industriasService.create(createIndustriaDto);
  }

  @Get()
  findAll() {
    return this.industriasService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.industriasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateIndustriaDto: UpdateIndustriaDto) {
    return this.industriasService.update(id, updateIndustriaDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.industriasService.remove(id);
  }
}
