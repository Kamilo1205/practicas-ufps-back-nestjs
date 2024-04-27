import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentoIdentidadService } from './documento-identidad.service';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from './dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { PaginationDto, UuidDto } from 'src/common/dto';

@Controller('documento-identidad')
export class DocumentoIdentidadController {
  constructor(
    private readonly documentoIdentidadService: DocumentoIdentidadService,
  ) {}

  @Post()
  @Roles(Rol.Coordinador)
  //@Permisos('crear-documento-identidad')
  @UseInterceptors(FileInterceptor('documento'))
  create(
    @Body() createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    @Body('folderId') folderId: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.documentoIdentidadService.create( createDocumentoIdentidadDto, documento, folderId );
  }

  @Get()
  @Roles(Rol.Coordinador)
  //@Permisos('obtener-documentos-identidad')
  findAll(@Query() { page, limit }: PaginationDto) {
    return this.documentoIdentidadService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  //@Permisos('obtener-documento-identidad')
  findOne(@Param() { id }: UuidDto) {
    return this.documentoIdentidadService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  //@Permisos('actualizar-documento-identidad')
  @UseInterceptors(FileInterceptor('documento'))
  update(
    @Param() { id }: UuidDto,
    @Body() updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
    @Body('folderId') folderId: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.documentoIdentidadService.update(id, updateDocumentoIdentidadDto, documento, folderId);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-documento-identidad')
  remove(@Param() { id }: UuidDto) {
    return this.documentoIdentidadService.remove(id);
  }
}
