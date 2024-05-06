import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';
import { Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Post()
  @Roles(Rol.Coordinador)
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return this.tipoDocumentoService.create(createTipoDocumentoDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.tipoDocumentoService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  findOne(@Param() { id }: UuidDto) {
    return this.tipoDocumentoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  update(@Param() { id }: UuidDto, @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    return this.tipoDocumentoService.update(id, updateTipoDocumentoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  remove(@Param() { id }: UuidDto) {
    return this.tipoDocumentoService.remove(id);
  }
}
