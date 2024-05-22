import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnioService } from './anio.service';
import { CreateAnioDto, UpdateAnioDto } from './dto/';
import { UuidDto } from 'src/common/dto';

@Controller('anio')
export class AnioController {
  constructor(private readonly anioService: AnioService) {}

  @Post()
  create(@Body() createAnioDto: CreateAnioDto) {
    return this.anioService.create(createAnioDto);
  }

  @Get()
  findAll() {
    return this.anioService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.anioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') { id }: UuidDto, @Body() updateAnioDto: UpdateAnioDto) {
    return this.anioService.update(id, updateAnioDto);
  }

  @Delete(':id')
  remove(@Param('id') { id }: UuidDto) {
    return this.anioService.remove(id);
  }
}
