import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateIndustriaDto, UpdateIndustriaDto } from './dto';
import { IndustriasService } from './industrias.service';
import { UuidDto } from 'src/common/dto';

@Controller('industrias')
export class IndustriasController {
  constructor(private readonly industriasService: IndustriasService) {}

  @Post()
  create(@Body() createIndustriaDto: CreateIndustriaDto) {
    return this.industriasService.create(createIndustriaDto);
  }

  @Get()
  findAll() {
    return this.industriasService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.industriasService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateIndustriaDto: UpdateIndustriaDto) {
    return this.industriasService.update(id, updateIndustriaDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.industriasService.remove(id);
  }
}