import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto, UpdateTipoDocumentoDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Roles(Rol.Coordinador)
  @Post()
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) {
    return this.tipoDocumentoService.create(createTipoDocumentoDto);
  }

  @Roles(Rol.Coordinador)
  @Get()
  findAll() {
    return this.tipoDocumentoService.findAll();
  }

  @Roles(Rol.Coordinador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDocumentoService.findOne(id);
  }

  @Roles(Rol.Coordinador)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto,
  ) {
    return this.tipoDocumentoService.update(id, updateTipoDocumentoDto);
  }

  @Roles(Rol.Coordinador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDocumentoService.remove(id);
  }
}
