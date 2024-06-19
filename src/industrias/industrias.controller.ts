import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateIndustriaDto, UpdateIndustriaDto } from './dto';
import { IndustriasService } from './industrias.service';
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
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.industriasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateIndustriaDto: UpdateIndustriaDto) {
    return this.industriasService.update(id, updateIndustriaDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.industriasService.remove(id);
  }
}
