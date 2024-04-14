import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('rut'), FileInterceptor('camara'))
  async create(
    @Body() createEmpresaDto: CreateEmpresaDto,
    @UploadedFile() fileRut: Express.Multer.File,
    @UploadedFile() fileCamara: Express.Multer.File,
  ) {
    if (!fileRut) throw new BadRequestException('Document file is required.');

    const empresa = await this.empresasService.create(
      createEmpresaDto,
      fileRut,
      fileCamara,
    );
    return empresa;
  }

  @Public()
  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(+id);
  }
}
