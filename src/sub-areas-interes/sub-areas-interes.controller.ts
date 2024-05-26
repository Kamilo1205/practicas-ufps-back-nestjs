import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubAreasInteresService } from './sub-areas-interes.service';
import { CreateSubAreasInteresDto, UpdateSubAreasInteresDto } from './dto';

@Controller('sub-areas-interes')
export class SubAreasInteresController {
  constructor(private readonly subAreasInteresService: SubAreasInteresService) {}

  @Post()
  create(@Body() createSubAreasInteresDto: CreateSubAreasInteresDto) {
    return this.subAreasInteresService.create(createSubAreasInteresDto);
  }

  @Get()
  findAll() {
    return this.subAreasInteresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subAreasInteresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubAreasInteresDto: UpdateSubAreasInteresDto) {
    return this.subAreasInteresService.update(id, updateSubAreasInteresDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subAreasInteresService.remove(id);
  }
}
