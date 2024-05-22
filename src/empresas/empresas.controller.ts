import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UuidDto } from 'src/common/dto';
import { UploadedFiles as UploadedFilesInterfaz } from './interfaces';
import { FilesNotFoundException } from './exceptions';

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

  @Patch()
  @Roles(Rol.Coordinador)
  update(@Param() { id }: UuidDto, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    //return this.empresasService.update(id, updateEmpresaDto);
  }

  @Get()
  @Roles(Rol.Coordinador)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    if (page === undefined || isNaN(page) || page < 0) page = 1;
    if (limit === undefined || isNaN(limit) || limit < 0) limit = 10;
    return this.empresasService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  findOne(@Param() { id }: UuidDto) {
    return this.empresasService.findOne(id);
  }

  @Roles(Rol.Coordinador)
  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.empresasService.remove(id);
  }
}
