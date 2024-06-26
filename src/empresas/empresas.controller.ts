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

  @Get('perfil')
  @Roles(Rol.Empresa)
  findOneByUsuarioId(@GetUser() usuario: Usuario) {
    return this.empresasService.findOne(usuario?.empresa?.id);
  }

  @Post('/tutores')
  @Roles(Rol.Empresa)
  createTutor(@Body() createTutorDto: Omit<CreateTutorDto, 'empresaId'>, @GetUser() usuario: Usuario) {
    return this.empresasService.createTutor(usuario?.id, createTutorDto);
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

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.empresasService.remove(id);
  }
}
