import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Roles(Rol.Empresa)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'rut', maxCount: 1 },
      { name: 'camara', maxCount: 1 },
    ]),
  )
  async create(
    @GetUser() usuario: Usuario,
    @Body() createEmpresaDto: CreateEmpresaDto,
    @UploadedFiles()
    files: { rut?: Express.Multer.File[]; camara?: Express.Multer.File[] },
  ) {
    if (
      !files.rut ||
      files.rut.length === 0 ||
      !files.camara ||
      files.camara.length === 0
    ) {
      throw new BadRequestException('Se requiren archivos rut y camara.');
    }

    const fileRut = files.rut[0];
    const fileCamara = files.camara[0];

    const empresa = await this.empresasService.create(
      createEmpresaDto,
      fileRut,
      fileCamara,
      usuario,
    );
    return empresa;
  }

  @Roles(Rol.Empresa)
  @Get('/perfil')
  findOneByUsuarioId(@GetUser() usuario: Usuario) {
    return this.empresasService.findOne(usuario.empresa.id);
  }

  @Roles(Rol.Coordinador)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.empresasService.findAll(page, limit);
  }

  @Roles(Rol.Coordinador)
  @Get(':id')
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
