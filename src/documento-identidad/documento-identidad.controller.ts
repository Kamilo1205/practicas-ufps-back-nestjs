import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentoIdentidadService } from './documento-identidad.service';
import {
  CreateDocumentoIdentidadDto,
  UpdateDocumentoIdentidadDto,
} from './dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.documentoIdentidadService.create(
      createDocumentoIdentidadDto,
      documento,
    );
  }

  @Get()
  @Roles(Rol.Coordinador)
  //@Permisos('obtener-documentos-identidad')
  findAll() {
    return this.documentoIdentidadService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  //@Permisos('obtener-documento-identidad')
  findOne(@Param('id') id: string) {
    return this.documentoIdentidadService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  //@Permisos('actualizar-documento-identidad')
  update(
    @Param('id') id: string,
    @Body() updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
  ) {
    return this.documentoIdentidadService.update(
      id,
      updateDocumentoIdentidadDto,
    );
  }

  @Delete(':id')
  //@Roles(Rol.Coordinador)
  @Permisos('remover-documento-identidad')
  remove(@Param('id') id: string) {
    return this.documentoIdentidadService.remove(id);
  }
}
