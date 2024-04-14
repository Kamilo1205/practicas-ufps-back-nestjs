import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { Readable } from 'stream';

@Injectable()
export class EmpresasService {
  folderEmpresasId: string =
    this.configService.get<string>('FOLDER_EMPRESAS_ID');

  constructor(
    @InjectRepository(Empresa)
    private empresasRepository: Repository<Empresa>,
    private googleDriveService: GoogleDriveService,
    private configService: ConfigService,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto, fileRut: Express.Multer.File) {
    const { nombre, nit } = createEmpresaDto;
    const nombreFolder = `${nit}-${nombre}`;
    const folderEmpresaId = await this.googleDriveService.createFolder(nombreFolder, this.folderEmpresasId);

    const fileMetadata = {
      name: fileRut.originalname,
      parents: [folderEmpresaId],
      public: false,
    };
    const media = {
      mimeType: fileRut.mimetype,
      body: Readable.from(fileRut.buffer),
    };
    const rutId = await this.googleDriveService.uploadFile(fileMetadata, media);

    this.empresasRepository.create({
      ...createEmpresaDto,
      rutUrl: rutId,
    });
  }

  findAll() {
    return `This action returns all empresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
