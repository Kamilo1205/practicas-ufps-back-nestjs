import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { EmpresaExistsException, EmpresaNotFoundException, UsuarioAlreadyHasEmpresaException } from './exceptions';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from 'src/representante-legal/dto';
import { RepresentanteLegalService } from 'src/representante-legal/representante-legal.service';
import { CreateDocumentoIdentidadDto, UpdateDocumentoIdentidadDto } from 'src/documento-identidad/dto';
import { DocumentosService } from 'src/documentos/documentos.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuarios/dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class EmpresasService {
  folderEmpresasId: string =
    this.configService.get<string>('FOLDER_EMPRESAS_ID');

  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly representanteLegalService: RepresentanteLegalService,
    private readonly documentosService: DocumentosService,
    private readonly usuariosService: UsuariosService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createEmpresaDto: CreateEmpresaDto,
    usuario: Usuario,
    camara: Express.Multer.File,
    rut: Express.Multer.File
  ) {
    if (usuario.empresa) throw new UsuarioAlreadyHasEmpresaException(usuario.id);
    const { nit, nombre } = createEmpresaDto;
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ nit });
    if (exisitingEmpresa) throw new EmpresaExistsException(nit);

    const folderNombre = `${nit}-${nombre}`;
    const folderEmpresaId = await this.googleDriveService.createFolder(folderNombre, this.folderEmpresasId);
    const [camaraComercialUrl, rutUrl] = await Promise.all([
      this.googleDriveService.uploadFile(`${nit}_Camara`, [folderEmpresaId], camara),
      this.googleDriveService.uploadFile(`${nit}_Rut`, [folderEmpresaId], rut),
    ]);

    const empresa = this.empresasRepository.create({
      ...createEmpresaDto,
      usuario,
      camaraComercialUrl,
      rutUrl,
      googleDriveFolderId: folderEmpresaId
    });
    return this.empresasRepository.save(empresa);
  }

  async createWithUsuario(
    createEmpresaDto: CreateEmpresaDto,
    createUsuario: CreateUsuarioDto,
    camara: Express.Multer.File,
    rut: Express.Multer.File
  ) {
    const usuario = await this.usuariosService.create(createUsuario);
    return this.create(createEmpresaDto, usuario, camara, rut);
  }

  async createRepresentanteLegal(
    id: string,
    createRepresentanteLegalDto: CreateRepresentanteLegalDto, 
    createDocumentoIdentidadDto: CreateDocumentoIdentidadDto,
    documento: Express.Multer.File
  ) {
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ id });
    if (!exisitingEmpresa) throw new EmpresaNotFoundException(id);

    const { googleDriveFolderId } = exisitingEmpresa;
    const representanteLegal = await this.representanteLegalService.create(
      createRepresentanteLegalDto, 
      createDocumentoIdentidadDto, 
      documento,
      googleDriveFolderId
    );
    const empresa = this.empresasRepository.create({ representanteLegal });
    return this.empresasRepository.update(id, empresa);
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
    const empresa = this.empresasRepository.findOneBy({ id });
    if (!empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto, camara: Express.Multer.File, rut: Express.Multer.File) {
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (!empresa) throw new EmpresaNotFoundException(id);
    
    const { nit, nombre, googleDriveFolderId: folderEmpresaId } = empresa;
    const { nit: nuevoNit, nombre: nuevoNombre } = updateEmpresaDto;
    
    if (nuevoNit && empresa.nit != nuevoNit) {
      const exisitingEmpresa = await this.empresasRepository.findOneBy({ nit });
      if (exisitingEmpresa) throw new EmpresaExistsException(nit);
    }
    
    if (nuevoNit || nuevoNombre) {
      const nombreFolder = `${nuevoNit || nit}-${nuevoNombre || nombre}`;
      await this.googleDriveService.renameFolder(folderEmpresaId, nombreFolder);
    }

    if (camara && rut) {
      const [camaraComercialUrl, rutUrl] = await Promise.all([
        this.googleDriveService.uploadFile(`${nit}_Camara`, [folderEmpresaId], camara),
        this.googleDriveService.uploadFile(`${nit}_Rut`, [folderEmpresaId], rut),
        this.googleDriveService.deleteFile(empresa.camaraComercialUrl),
        this.googleDriveService.deleteFile(empresa.rutUrl),
      ]);
      await this.empresasRepository.update(id, { ...updateEmpresaDto, camaraComercialUrl, rutUrl });
    }

    if (camara && !rut) {
      const [camaraComercialUrl] = await Promise.all([
        this.googleDriveService.uploadFile(`${nit}_Camara`, [folderEmpresaId], camara),
        this.googleDriveService.deleteFile(empresa.camaraComercialUrl),
      ]);
      await this.empresasRepository.update(id, { ...updateEmpresaDto, camaraComercialUrl });
    }

    if (rut && !camara) {
      const [rutUrl] = await Promise.all([
        this.googleDriveService.uploadFile(`${nit}_Rut`, [folderEmpresaId], rut),
        this.googleDriveService.deleteFile(empresa.rutUrl),
      ]);
      await this.empresasRepository.update(id, { ...updateEmpresaDto, rutUrl });
    }
    return this.empresasRepository.findOneBy({ id });
  }

  async updateRepresentanteLegal(
    id: string,
    updateRepresentanteLegalDto: UpdateRepresentanteLegalDto, 
    updateDocumentoIdentidadDto: UpdateDocumentoIdentidadDto,
    documento: Express.Multer.File
  ) {
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ id });
    if (exisitingEmpresa) throw new EmpresaExistsException(id);

    const { representanteLegal, googleDriveFolderId } = exisitingEmpresa;
    await this.representanteLegalService.update(
      representanteLegal.id,
      updateRepresentanteLegalDto, 
      updateDocumentoIdentidadDto, 
      documento,
      googleDriveFolderId
    );
  }

  async updateWithUsuario(
    id: string,
    updateEmpresaDto: UpdateEmpresaDto,
    updateUsuarioDto: UpdateUsuarioDto,
    camara: Express.Multer.File,
    rut: Express.Multer.File
  ) {
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ id });
    if (exisitingEmpresa) throw new EmpresaExistsException(id);

    const { usuario } = exisitingEmpresa;
    await this.usuariosService.update(usuario.id, updateUsuarioDto);
    return this.update(id, updateEmpresaDto, camara, rut);
  }

  async remove(id: string) {
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.softDelete({ id });
  }

  getConvenioDocument(usuario: Usuario) {
    return this.documentosService.generateConveioDocument(usuario);
  }

  async uploadConvenioDocument(usuario: Usuario, documento: Express.Multer.File) {
    const { id, googleDriveFolderId } = usuario.empresa;
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (empresa) throw new EmpresaNotFoundException(id);
    const convenioId = this.googleDriveService.uploadFile('Convenio', [googleDriveFolderId], documento);
    console.log(convenioId);
  }
}
