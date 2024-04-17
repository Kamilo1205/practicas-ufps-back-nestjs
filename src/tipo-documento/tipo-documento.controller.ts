import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';
import { Public, Roles } from 'src/auth/decorators';
import { Role } from 'src/usuarios/enums/role.enum';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Roles(Role.Coordinador)
  @Post()
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return this.tipoDocumentoService.create(createTipoDocumentoDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.tipoDocumentoService.findAll();
  }

  @Roles(Role.Coordinador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDocumentoService.findOne(id);
  }

  @Roles(Role.Coordinador)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    return this.tipoDocumentoService.update(id, updateTipoDocumentoDto);
  }

  @Roles(Role.Coordinador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDocumentoService.remove(id);
  }
}
