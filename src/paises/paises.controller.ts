import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaiseDto, UpdatePaiseDto } from './dto';
import { UuidDto } from 'src/common/dto';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaiseDto: CreatePaiseDto) {
    return this.paisesService.create(createPaiseDto);
  }

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.paisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updatePaiseDto: UpdatePaiseDto) {
    return this.paisesService.update(id, updatePaiseDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.paisesService.remove(id);
  }
}
