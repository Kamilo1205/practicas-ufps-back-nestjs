import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConsoleLogger } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { UsuariosService } from './usuarios.service';
import { Roles } from 'src/auth/decorators';
import { Rol } from '../auth/enums';
import { UuidDto } from 'src/common/dto';
import { Filtering, FilteringParams, Pagination, PaginationParams, Sorting, SortingParams } from 'src/common/decorators';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(Rol.Administrador)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // @Get()
  // @Roles(Rol.Administrador)
  // findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('sort') sort: string) {
  //   if (page === undefined || isNaN(page) || page <= 0) page = 1;
  //   if (limit === undefined || isNaN(limit) || limit < 0) limit = 10;
  //   return this.usuariosService.findAll(page, limit);
  // }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams(['displayName', 'fechaCreacion', 'estaActivo', 'emailConfirmado', 'email']) filters: Filtering[],
    @SortingParams(['displayName', 'fechaCreacion', 'estaActivo', 'emailConfirmado', 'email']) sorts: Sorting[],
    @Query('search') search?: string,
  ) {
    return this.usuariosService.findAll(paginationParams, sorts, filters, search);
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.usuariosService.remove(id);
  }
}
