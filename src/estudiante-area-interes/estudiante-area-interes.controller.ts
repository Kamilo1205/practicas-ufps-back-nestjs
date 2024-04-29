import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteAreaInteresService } from './estudiante-area-interes.service';
import { CreateEstudianteAreaIntereDto, UpdateEstudianteAreaIntereDto } from './dto/';
import { UuidDto } from 'src/common/dto';

@Controller('estudiante-area-interes')
export class EstudianteAreaInteresController {
  constructor(private readonly estudianteAreaInteresService: EstudianteAreaInteresService) {}

  @Post()
  create(@Body() createEstudianteAreaIntereDto: CreateEstudianteAreaIntereDto) {
    return this.estudianteAreaInteresService.create(createEstudianteAreaIntereDto);
  }

  @Get()
  findAll() {
    return this.estudianteAreaInteresService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.estudianteAreaInteresService.findOne(id);
  }

  /* @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateEstudianteAreaIntereDto: UpdateEstudianteAreaIntereDto) {
    return this.estudianteAreaInteresService.update(id, updateEstudianteAreaIntereDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.estudianteAreaInteresService.remove(id);
  } */
}
