import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post('/registro')
  @Roles(Rol.Estudiante)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'certificadoAfiliacionEps', maxCount: 1 },
      { name: 'documentoIdentidad', maxCount: 1 },
      { name: 'hojaDeVida', maxCount: 1 },
      { name: 'horarioClase', maxCount: 1 }
    ]),
  )
  create(
    @GetUser() usuario: Usuario, 
    @Body() createEstudianteDto: CreateEstudianteDto, 
    @UploadedFiles() files: {
      certificadoAfiliacionEps?: Express.Multer.File[];
      documentoIdentidad?: Express.Multer.File[];
      hojaDeVida?: Express.Multer.File[];
      horarioClase?: Express.Multer.File[];
    }
  ) {
    if (!files?.certificadoAfiliacionEps || !files?.documentoIdentidad || !files?.hojaDeVida || !files?.horarioClase) {
      throw new BadRequestException('Todos los archivos son requeridos');
    }
    return this.estudiantesService.create(createEstudianteDto, usuario, files);
  }

  @Get('/perfil')
  @Roles(Rol.Estudiante)
  getPerfil(@GetUser() usuario: Usuario) {
    return this.estudiantesService.findOne(usuario.estudiante.id);
  }


  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.estudiantesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(id);
  }
}
