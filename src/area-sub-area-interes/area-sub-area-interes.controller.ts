import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaSubAreaInteresService } from './area-sub-area-interes.service';
import { CreateAreaSubAreaInteresDto, UpdateAreaSubAreaInteresDto } from './dto';

@Controller('area-sub-area-interes')
export class AreaSubAreaInteresController {
  constructor(private readonly areaSubAreaInteresService: AreaSubAreaInteresService) {}

  @Post()
  create(@Body() createAreaSubAreaInteresDto: CreateAreaSubAreaInteresDto) {
    return this.areaSubAreaInteresService.create(createAreaSubAreaInteresDto);
  }

  @Get()
  findAll() {
    return this.areaSubAreaInteresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaSubAreaInteresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaSubAreaInteresDto: UpdateAreaSubAreaInteresDto) {
    return this.areaSubAreaInteresService.update(+id, updateAreaSubAreaInteresDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaSubAreaInteresService.remove(+id);
  }
}
