import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EstudianteEpsService } from './estudiante-eps.service';
import { CreateEstudianteEpsDto, UpdateEstudianteEpsDto } from './dto';
import { Rol } from 'src/auth/enums/rol.enum';
import { Permisos, Roles } from 'src/auth/decorators';
import { UuidDto } from 'src/common/dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('estudiante-eps')
export class EstudianteEpsController {
  constructor(private readonly estudianteEpsService: EstudianteEpsService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('create-estudiante-eps')
  @UseInterceptors(FileInterceptor('documento'))
  create(
    @Body() createEstudianteEpsDto: CreateEstudianteEpsDto,
    @Body('folderId') folderId: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.estudianteEpsService.create(createEstudianteEpsDto, documento, folderId);
  }

  @Get()
  @Roles(Rol.Coordinador)
  @Permisos('obtener-estudiantes-eps')
  findAll() {
    return this.estudianteEpsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-estudiante-eps')
  findOne(@Param() { id }: UuidDto) {
    return this.estudianteEpsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-estudiante-eps')
  @UseInterceptors(FileInterceptor('documento'))
  update(
    @Param() { id }: UuidDto, 
    @Body() updateEstudianteEpsDto: UpdateEstudianteEpsDto,
    @Body('folderId') folderId: string,
    @UploadedFile() documento: Express.Multer.File,
  ) {
    return this.estudianteEpsService.update(id, updateEstudianteEpsDto, documento, folderId);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remocer-estudiante-eps')
  remove(@Param() { id }: UuidDto) {
    return this.estudianteEpsService.remove(id);
  }
}
