import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto, UpdateCiudadDto } from './dto';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadesService.create(createCiudadDto);
  }

  @Get()
  findAll() {
    return this.ciudadesService.findAll();
  }

  @Get('departamento/:departamentoId')
  findByDepartamento(@Param('departamentoId') departamentoId: string) {
    return this.ciudadesService.findByDepartamento(departamentoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadesService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadesService.remove(id);
  }
}
