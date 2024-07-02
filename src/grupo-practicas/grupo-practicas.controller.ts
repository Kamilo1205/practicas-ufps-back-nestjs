import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { GrupoPracticasService } from './grupo-practicas.service';
import { CreateGrupoPracticaDto, UpdateGrupoPracticaDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('grupo-practicas')
export class GrupoPracticasController {
  constructor(private readonly grupoPracticasService: GrupoPracticasService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createGrupoPracticaDto: CreateGrupoPracticaDto) {
    return this.grupoPracticasService.create(createGrupoPracticaDto);
  }

  @Get()
  findAll() {
    return this.grupoPracticasService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.grupoPracticasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateGrupoPracticaDto: UpdateGrupoPracticaDto) {
    return this.grupoPracticasService.update(id, updateGrupoPracticaDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.grupoPracticasService.remove(id);
  }
}
