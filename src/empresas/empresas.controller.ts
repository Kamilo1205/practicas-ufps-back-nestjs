import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, ParseUUIDPipe } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UploadedFiles as UploadedFilesInterfaz } from './interfaces';
import { FilesNotFoundException } from './exceptions';
import { CreateTutorDto } from 'src/tutores/dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post('registro')
  @Roles(Rol.Empresa)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
      { name: 'documentoIdentidad', maxCount: 1 },
      { name: 'convenio', maxCount: 1 }
    ]),
  )
  registro( 
    @GetUser() usuario: Usuario, 
    @Body() createEmpresaDto: CreateEmpresaDto, 
    @UploadedFiles() files: UploadedFilesInterfaz,
   ) {
    if (!files.camara[0] && !files.rut[0] && !files.camara[0] && !files.convenio[0]) throw new FilesNotFoundException();
    return this.empresasService.create(createEmpresaDto, usuario, files);
  }

  @Get('estado/:id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  async findEstadoById(@Param('id', new ParseUUIDPipe()) id: string) {
    var data = await this.empresasService.findOne(id);
    var estado = true;
    if(data.usuario.estaActivo){
      estado= false;
    }else{
      estado= true;
    }
    this.empresasService.updateEstadoUsuario(data.usuario.id, estado);
    return true;
  }

  @Get('perfil')
  @Roles(Rol.Empresa)
  findOneByUsuarioId(@GetUser() usuario: Usuario) {
    return this.empresasService.findOne(usuario?.empresa?.id);
  }

  @Get('/tutores')
  @Roles(Rol.Empresa)
  findTutoresByEmpresaId(@GetUser() usuario: Usuario) {
    return this.empresasService.findTutoresByEmpresaId(usuario?.id);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasService.restore(id);
  }

  @Patch()
  @Roles(Rol.Empresa)
  updatePerfil(@Body() updateEmpresaDto: UpdateEmpresaDto, @GetUser() usuario: Usuario) {
    return this.empresasService.update(usuario.id, updateEmpresaDto);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll(@Paginate() query: PaginateQuery) {
    return this.empresasService.findAll(query);
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasService.findOne(id);
  }

  @Get(':id/practicantes')
  @Roles(Rol.Coordinador, Rol.Administrador, Rol.Empresa)
  findPracticantesByEmpresaId(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasService.findPracticantesByEmpresaId(id);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasService.remove(id);
  }

  @Patch('deshabilitar-tutor/:tutorId')
  @Roles(Rol.Empresa)
  async deshabilitarTutor(@Param('tutorId', new ParseUUIDPipe()) tutorId: string, @GetUser() usuario: Usuario): Promise<void> {
    await this.empresasService.deshabilitarTutor(usuario.empresa.id, tutorId);
  }

  @Patch('habilitar-tutor/:tutorId')
  @Roles(Rol.Empresa)
  async habilitarTutor(@Param('tutorId', new ParseUUIDPipe()) tutorId: string, @GetUser() usuario: Usuario): Promise<void> {
    await this.empresasService.habilitarTutor(usuario.empresa.id, tutorId);
  }
}
