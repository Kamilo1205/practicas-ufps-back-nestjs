import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto, UpdateDepartamentoDto } from './dto';
import { UuidDto } from 'src/common/dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get('pais/:paisId')
  findByPais(@Param('paisId') paisId: string) {
    return this.departamentosService.findByPais(paisId);
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.departamentosService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentosService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.departamentosService.remove(id);
  }
}
