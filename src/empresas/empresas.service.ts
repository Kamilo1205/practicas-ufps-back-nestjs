import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, Connection } from 'typeorm';
import { Readable } from 'stream';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateRepresentanteLegalDto } from 'src/representante-legal/dto';

@Injectable()
export class EmpresasService {
  folderEmpresasId: string =
    this.configService.get<string>('FOLDER_EMPRESAS_ID');

  constructor(
    private connection: Connection,
    @InjectRepository(Empresa)
    private empresasRepository: Repository<Empresa>,
    private googleDriveService: GoogleDriveService,
    private configService: ConfigService,
  ) {}

  async create(
    createEmpresaDto: CreateEmpresaDto,
    createRepresentanteLegalDto: CreateRepresentanteLegalDto,
    usuario: Usuario,
    files: any,
  ) {
    try {
      const { nit, nombre } = createEmpresaDto;
      const folderEmpresaId = await this.googleDriveService.createFolder(
        `${nit}-${nombre}`,
        this.folderEmpresasId,
      );

      /* const { rut, camara, documento, solicitudConvenio } = files;
      const [rutId, nitId, solicitudConvenio] = Promise.all([
        this.uploadFile(`${nit}-rut`, folderEmpresaId, rut[0]),
        this.uploadFile(`${nit}-camara`, folderEmpresaId, camara[0]),
        this.uploadFile(
          `${nit}-solicitud-convenio`,
          folderEmpresaId,
          solicitudConvenio[0],
        ),
      ]); */
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.empresasRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
      relations: ['usuario'],
    });

    return { data, total };
  }

  findOne(id: string) {
    return this.empresasRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
  }

  update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: string) {
    return this.empresasRepository.softDelete({ id });
  }

  uploadFile(name: string, folderEmpresaId: string, file: Express.Multer.File) {
    const fileMetadata = {
      name,
      parents: [folderEmpresaId],
      public: false,
    };
    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };
    return this.googleDriveService.uploadFile(fileMetadata, media);
  }
}
