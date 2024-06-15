import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresasSolicitudesService } from './empresas-solicitudes.service';
import { CreateEmpresaSolicitudDto, UpdateEmpresaSolicitudDto } from './dto';

@Controller('empresas-solicitudes')
export class EmpresasSolicitudesController {
  constructor(private readonly empresasSolicitudesService: EmpresasSolicitudesService) {}

  @Post()
  create(@Body() createEmpresaSolicitudDto: CreateEmpresaSolicitudDto) {
    return this.empresasSolicitudesService.create(createEmpresaSolicitudDto);
  }a

  @Get()
  findAll() {
    return this.empresasSolicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasSolicitudesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaSolicitudDto: UpdateEmpresaSolicitudDto) {
    return this.empresasSolicitudesService.update(id, updateEmpresaSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasSolicitudesService.remove(id);
  }
}
