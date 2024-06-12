import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaInteresHerramientasService } from './area-interes-herramientas.service';
import { CreateAreaInteresHerramientaDto } from './dto/create-area-interes-herramienta.dto';
import { UpdateAreaInteresHerramientaDto } from './dto/update-area-interes-herramienta.dto';

@Controller('area-interes-herramientas')
export class AreaInteresHerramientasController {
  constructor(private readonly areaInteresHerramientasService: AreaInteresHerramientasService) {}

  @Post()
  create(@Body() createAreaInteresHerramientaDto: CreateAreaInteresHerramientaDto) {
    return this.areaInteresHerramientasService.create(createAreaInteresHerramientaDto);
  }

  @Get()
  findAll() {
    return this.areaInteresHerramientasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaInteresHerramientasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaInteresHerramientaDto: UpdateAreaInteresHerramientaDto) {
    return this.areaInteresHerramientasService.update(+id, updateAreaInteresHerramientaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaInteresHerramientasService.remove(+id);
  }
}
