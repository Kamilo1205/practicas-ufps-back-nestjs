import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { GetUser, Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateRepresentanteLegalDto } from 'src/representante-legal/dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Roles(Rol.Empresa)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
      { name: 'documento', maxCount: 1 },
      { name: 'solicitudConvenio', maxCount: 1 },
    ]),
  )
  async create(
    @GetUser() usuario: Usuario,
    @Body() createEmpresaDto: CreateEmpresaDto,
    @Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    @UploadedFiles()
    files: { rut: Express.Multer.File[]; camara: Express.Multer.File[]; documento: Express.Multer.File[]; solicitudConvenio: Express.Multer.File[] },
  ) {
    return this.empresasService.create(
      createEmpresaDto,
      createRepresentanteLegalDto,
      usuario,
      files,
    );
  }

  @Roles(Rol.Empresa)
  @Get('/perfil')
  findOneByUsuarioId(@GetUser() usuario: Usuario) {
    return this.empresasService.findOne(usuario.empresa.id);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-empresas')
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.empresasService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-empresas-id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(id);
  }

  @Roles(Rol.Empresa)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Roles(Rol.Coordinador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(id);
  }
}
