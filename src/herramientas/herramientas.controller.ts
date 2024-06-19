import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { CreateHerramientaDto, UpdateHerramientaDto } from './dto';
import { Rol } from 'src/auth/enums';
import { Roles } from 'src/auth/decorators';

@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createHerramientaDto: CreateHerramientaDto) {
    return this.herramientasService.create(createHerramientaDto);
  }

  @Get()
  findAll() {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.herramientasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateHerramientaDto: UpdateHerramientaDto) {
    return this.herramientasService.update(id, updateHerramientaDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.herramientasService.remove(id);
  }
}
