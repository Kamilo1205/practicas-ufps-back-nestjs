import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseUUIDPipe, UploadedFile, Res } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { FilesNotFoundException } from './exceptions';
import { GetUser, Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from 'src/representante-legal/dto';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from 'src/documento-identidad/dto';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuarios/dto';
import { UuidDto } from 'src/common/dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  // Empresa
  @Post('registro/informacion-basica')
  @Roles(Rol.Empresa)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
    ]),
  )
  registerCompanyBasicInfo(
    @GetUser() usuario: Usuario,
    @Body() createEmpresaDto: CreateEmpresaDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) files: { rut: Express.Multer.File[], camara: Express.Multer.File[] },
  ) {
    const camara = files.camara && files.camara[0];
    const rut = files.rut && files.rut[0];
    if (!camara && !rut) throw new FilesNotFoundException();
    return this.empresasService.create(createEmpresaDto, usuario, camara, rut);
  }

  @Roles(Rol.Empresa)
  @Patch('registro/informacion-basica')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
    ]),
  )
  updateCompanyBasicInfo( 
    @GetUser() usuario: Usuario,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
    @UploadedFiles(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1800000 }),
      //     new FileTypeValidator({ fileType: 'application/pdf' })
      //   ]
      // })
    ) files: { rut: Express.Multer.File[], camara: Express.Multer.File[] },
  ) {
    const camara = files.camara && files.camara[0];
    const rut = files.rut && files.rut[0];
    return this.empresasService.update(usuario.empresa.id, updateEmpresaDto, camara, rut);
  }

  @Roles(Rol.Empresa)
  @Post('registro/informacion-legal')
  @UseInterceptors(FileInterceptor('documento'))
  registerCompanyLegalInfo(
    @GetUser() usuario: Usuario,    
    @Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    @Body() createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) documento: Express.Multer.File,
  ) {
    return this.empresasService.createRepresentanteLegal(
      usuario.empresa.id,
      createRepresentanteLegalDto, 
      createDocumentoIdentidadDto, 
      documento
    );
  }

  @Roles(Rol.Empresa)
  @Patch('registro/informacion-legal')
  @UseInterceptors(FileInterceptor('documento'))
  updateCompanyLegalInfo(
    @GetUser() usuario: Usuario,    
    @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto,
    @Body() updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) documento: Express.Multer.File,
  ) {
    return this.empresasService.updateRepresentanteLegal(
      usuario.empresa.id, 
      updateRepresentanteLegalDto, 
      updateDocumentoIdentidadDto,
      documento
    );
  }

  @Roles(Rol.Empresa)
  @Get('solicitud-convenio')
  getSolicitudConvenio(@GetUser() usuario: Usuario, @Res() res: Response) {
    const documentBuffer = this.empresasService.getConvenioDocument(usuario);
    res.set({
      'Content-Disposition': 'attachment; filename=document.docx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    res.write(documentBuffer);
    res.end();
  }

  @Roles(Rol.Empresa)
  @Post('solicitud-convenio')
  @UseInterceptors(FileInterceptor('convenio'))
  uploadSolicitudConvenio(
    @GetUser() usuario: Usuario, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) convenio: Express.Multer.File
  ) {
    return this.empresasService.uploadConvenioDocument(usuario, convenio);
  }

  @Roles(Rol.Empresa)
  @Get('perfil')
  findOneByUsuarioId(@GetUser() usuario: Usuario) {
    return this.empresasService.findOne(usuario.empresa.id);
  }

  // Cordinador
  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-empresa')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
    ]),
  )
  create(
    @Body() createEmpresaDto: CreateEmpresaDto,
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) files: { rut: Express.Multer.File[], camara: Express.Multer.File[] },
  ) {
    const camara = files.camara && files.camara[0];
    const rut = files.rut && files.rut[0];
    if (!camara && !rut) throw new FilesNotFoundException();
    this.empresasService.createWithUsuario(createEmpresaDto, createUsuarioDto, camara, rut);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-empresa')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
    ]),
  )
  update(
    @Param() { id }: UuidDto,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) files: { rut: Express.Multer.File[], camara: Express.Multer.File[] },
  ) {
    const camara = files.camara && files.camara[0];
    const rut = files.rut && files.rut[0];
    if (!camara && !rut) throw new FilesNotFoundException();
    this.empresasService.updateWithUsuario(id, updateEmpresaDto, updateUsuarioDto, camara, rut);
  }

  @Roles(Rol.Empresa)
  @Post(':id/informacion-legal')
  @UseInterceptors(FileInterceptor('documento'))
  registerCompanyLegalInfoWithId( 
    @Param() { id }: UuidDto,  
    @Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    @Body() createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) documento: Express.Multer.File,
  ) {
    return this.empresasService.createRepresentanteLegal(
      id,
      createRepresentanteLegalDto, 
      createDocumentoIdentidadDto, 
      documento
    );
  }

  @Roles(Rol.Empresa)
  @Patch(':id/informacion-legal')
  @UseInterceptors(FileInterceptor('documento'))
  updateCompanyLegalInfoWithId(   
    @Param() { id }: UuidDto,
    @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto,
    @Body() updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1800000 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ]
      })
    ) documento: Express.Multer.File,
  ) {
    return this.empresasService.updateRepresentanteLegal(
      id, 
      updateRepresentanteLegalDto, 
      updateDocumentoIdentidadDto,
      documento
    );
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-empresas')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.empresasService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-empresa')
  findOne(@Param() { id }: UuidDto) {
    return this.empresasService.findOne(id);
  }

  @Roles(Rol.Coordinador)
  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.empresasService.remove(id);
  }
}
