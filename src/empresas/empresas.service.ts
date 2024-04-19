import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, Connection } from 'typeorm';
import { Readable } from 'stream';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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
    fileRut: Express.Multer.File,
    fileCamara: Express.Multer.File,
    usuario: Usuario,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { nombre, nit } = createEmpresaDto;
      const nombreFolder = `${nit}-${nombre}`;
      const folderEmpresaId = await this.googleDriveService.createFolder(
        nombreFolder,
        this.folderEmpresasId,
      );

      // Uso de Promise.all para subir ambos archivos simultáneamente
      const [rutId, camaraComercioId] = await Promise.all([
        this.uploadRutFile(nit, folderEmpresaId, fileRut),
        this.uploadCamaraComercioFile(nit, folderEmpresaId, fileCamara),
      ]);

      const empresa = this.empresasRepository.create({
        ...createEmpresaDto,
        rutUrl: rutId,
        camaraComercialUrl: camaraComercioId,
        googleDriveFolderId: folderEmpresaId,
        usuario,
      });

      await queryRunner.manager.save(empresa);
      await queryRunner.commitTransaction();
      return empresa;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
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

  uploadRutFile(
    nit: string,
    folderEmpresaId: string,
    file: Express.Multer.File,
  ) {
    const fileMetadata = {
      name: `${nit}-rut`,
      parents: [folderEmpresaId],
      public: false,
    };
    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };
    return this.googleDriveService.uploadFile(fileMetadata, media);
  }

  uploadCamaraComercioFile(
    nit: string,
    folderEmpresaId: string,
    file: Express.Multer.File,
  ) {
    const fileMetadata = {
      name: `${nit}-camara-de-comercio`,
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
