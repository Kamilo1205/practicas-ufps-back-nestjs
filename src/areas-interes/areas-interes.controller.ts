import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreasInteresService } from './areas-interes.service';
import { CreateAreaInteresDto, UpdateAreaInteresDto } from './dto';

@Controller('areas-interes')
export class AreasInteresController {
  constructor(private readonly areasInteresService: AreasInteresService) {}

  @Post()
  create(@Body() createAreaInteresDto: CreateAreaInteresDto) {
    return this.areasInteresService.create(createAreaInteresDto);
  }

  @Get()
  findAll() {
    return this.areasInteresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasInteresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaInteresDto: UpdateAreaInteresDto) {
    return this.areasInteresService.update(id, updateAreaInteresDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasInteresService.remove(id);
  }
}
