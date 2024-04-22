import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RepresentanteLegalService } from './representante-legal.service';
import {
  CreateRepresentanteLegalDto,
  UpdateRepresentanteLegalDto,
} from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { CreateDocumentoIdentidadDto } from 'src/documento-identidad/dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('representante-legal')
export class RepresentanteLegalController {
  constructor(
    private readonly representanteLegalService: RepresentanteLegalService,
  ) {}

  @Post()
  @Roles(Rol.Coordinador)
  @UseInterceptors(FileInterceptor('documento'))
  create(
    @Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    @Body() createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    @Body() folderId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.representanteLegalService.create(
      createRepresentanteLegalDto,
      createDocumentoIdentidadDto,
      file,
      folderId,
    );
  }

  @Roles(Rol.Coordinador)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.representanteLegalService.findAll(page, limit);
  }

  @Roles(Rol.Coordinador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.representanteLegalService.findOne(id);
  }

  @Roles(Rol.Coordinador)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto,
  ) {
    return this.representanteLegalService.update(
      id,
      updateRepresentanteLegalDto,
    );
  }

  @Roles(Rol.Coordinador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representanteLegalService.remove(id);
  }
}
