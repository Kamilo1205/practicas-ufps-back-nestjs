import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RepresentanteLegalService } from './representante-legal.service';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from 'src/documento-identidad/dto';
import { UuidDto } from 'src/common/dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('representante-legal')
export class RepresentanteLegalController {
  constructor(
    private readonly representanteLegalService: RepresentanteLegalService,
  ) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-representante-legal')
  @UseInterceptors(FileInterceptor('documento'))
  create(
    @Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    @Body() createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    @Body('folderId') folderId: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.representanteLegalService.create( createRepresentanteLegalDto, createDocumentoIdentidadDto, documento, folderId);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-representantes-legales')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.representanteLegalService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-representante-legal')
  findOne(@Param() { id }: UuidDto) {
    return this.representanteLegalService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-representante-legal')
  @UseInterceptors(FileInterceptor('documento'))
  update(
    @Param() { id }: UuidDto,
    @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto,
    @Body() UpdateDocumentoIdentidadDto?: UpdateDocumentoIdentidadDto,
    @Body('folderId') folderId?: string,
    @UploadedFile() documento?: Express.Multer.File,
  ) {
    return this.representanteLegalService.update(id, updateRepresentanteLegalDto, UpdateDocumentoIdentidadDto, documento, folderId);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-representante-legal')
  remove(@Param() { id }: UuidDto) {
    return this.representanteLegalService.remove(id);
  }
}
