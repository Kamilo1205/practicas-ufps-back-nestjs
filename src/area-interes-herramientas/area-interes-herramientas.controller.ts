import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AreaInteresHerramientasService } from './area-interes-herramientas.service';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { CreateAreaInteresHerramientaDto, UpdateAreaInteresHerramientaDto } from './dto';

@Controller('area-interes-herramientas')
export class AreaInteresHerramientasController {
  constructor(private readonly areaInteresHerramientasService: AreaInteresHerramientasService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createAreaInteresHerramientaDto: CreateAreaInteresHerramientaDto) {
    return this.areaInteresHerramientasService.create(createAreaInteresHerramientaDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.areaInteresHerramientasService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.areaInteresHerramientasService.findOne(id);
  }

  @Patch(':id/restore')
  @Roles(Rol.Coordinador, Rol.Administrador)
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.areaInteresHerramientasService.restore(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAreaInteresHerramientaDto: UpdateAreaInteresHerramientaDto) {
    return this.areaInteresHerramientasService.update(id, updateAreaInteresHerramientaDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.areaInteresHerramientasService.remove(id);
  }
}
