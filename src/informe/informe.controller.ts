import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { InformeService } from './informe.service';
import { UpdateInformeDto } from './dto/update-informe.dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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

  @Patch(':id/aprobar-tutor-empresarial')
  @Roles(Rol.Tutor)
  aprobarTutorEmpresarial(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.informeService.aprobarInformeTutorEmpresarial(id, usuario);
  }

  @Patch(':id/aprobar-tutor-institucional')
  @Roles(Rol.Tutor)
  aprobarTutorInstitcional(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.informeService.aprobarInformeTutorInstitucional(id, usuario);
  }

}
