import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { InformeService } from './informe.service';
import { UpdateInformeDto } from './dto/update-informe.dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

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

}
