import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { InformeService } from './informe.service';
import { CreateInformeDto } from './dto/create-informe.dto';
import { UpdateInformeDto } from './dto/update-informe.dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { CreateNuevaResponsabilidadDto } from './dto/create-nueva-responsabilidad.dto';

@Controller('informe')
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  @Get(':id')
  @Roles(Rol.Estudiante)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.informeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Estudiante)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateInformeDto: UpdateInformeDto) {
    return this.informeService.update(id, updateInformeDto);
  }

  @Delete(':id')
  @Roles(Rol.Estudiante)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.informeService.remove(id);
  }

  @Post(':informeId/nuevas-responsabilidades')
  @Roles(Rol.Estudiante)
  addNuevasResponsabilidades(@Param('informeId', new ParseUUIDPipe()) informeId: string, @Body() createNuevaResponsabilidadDto: CreateNuevaResponsabilidadDto) {
    return this.informeService.createNuevasResponsabilidades(informeId, createNuevaResponsabilidadDto);
  }

  @Delete('responsabilidad/:id')
  @Roles(Rol.Estudiante)
  eliminarResponsabilidad(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.informeService.eliminarNuevaResponsabilidad(id);
  }

}
