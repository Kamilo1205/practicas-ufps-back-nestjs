import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { EmpresaExistsException, EmpresaNotFoundException, UsuarioAlreadyHasEmpresaException } from './exceptions';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { UploadedFiles as UploadedFilesInterfaz } from './interfaces';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RepresentanteLegalService } from 'src/representante-legal/representante-legal.service';
import { PaisesService } from 'src/paises/paises.service';
import { DepartamentosService } from 'src/departamentos/departamentos.service';
import { CiudadesService } from 'src/ciudades/ciudades.service';
import { IndustriasService } from 'src/industrias/industrias.service';

@Injectable()
export class EmpresasService {
  folderEmpresasId: string = this.configService.get<string>('FOLDER_EMPRESAS_ID');

  constructor(
    @InjectRepository(Empresa) private readonly empresasRepository: Repository<Empresa>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly usuariosService: UsuariosService,
    private readonly configService: ConfigService,
    private readonly representanteLegalService: RepresentanteLegalService,
    private readonly ciudadesService: CiudadesService,
    private readonly industriasService: IndustriasService,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto, usuario: Usuario, files: UploadedFilesInterfaz) {
    if (usuario.empresa) throw new UsuarioAlreadyHasEmpresaException(usuario.id);
    const { nit, nombre } = createEmpresaDto;
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ nit });
    if (exisitingEmpresa) throw new EmpresaExistsException(nit);

    const { camara, rut, documentoIdentidad, convenio } = files;
    const folderNombre = `${nit}-${nombre}`;
    const folderEmpresaId = await this.googleDriveService.createFolderIfNotExist(folderNombre, this.folderEmpresasId);
    const [camaraComercioUrl, rutUrl, documentoIdentidadUrl, soilicitudConvenioUrl] = await Promise.all([
      this.googleDriveService.uploadAndReplaceFile(`Camara_Comercio`, [folderEmpresaId], camara[0]),
      this.googleDriveService.uploadAndReplaceFile(`Rut`, [folderEmpresaId], rut[0]),
      this.googleDriveService.uploadAndReplaceFile(`Documento_Identidad`, [folderEmpresaId], documentoIdentidad[0]),
      this.googleDriveService.uploadAndReplaceFile(`Solicitud_Convenio`, [folderEmpresaId], convenio[0])
    ]); 
   
    let representanteLegal = await this.representanteLegalService.findOneByNumeroDocumento(createEmpresaDto.representante.numeroDocumento);
    if (!representanteLegal) {
      representanteLegal = await this.representanteLegalService.create({
        ...createEmpresaDto.representante,
        documentoIdentidadUrl
      });
    }
    
    const ciudad = await this.ciudadesService.findOne(createEmpresaDto.ciudadId);
    const industria = await this.industriasService.findOne(createEmpresaDto.industriaId);

    const empresa = this.empresasRepository.create({
      id: usuario.id,
      ...createEmpresaDto,
      usuario, 
      industria, 
      ciudad,
      googleDriveFolderId: folderEmpresaId, 
      representanteLegal, 
      camaraComercioUrl, 
      rutUrl,
      soilicitudConvenioUrl
    });
    
    await this.empresasRepository.save(empresa);
    await this.usuariosService.update(usuario.id, { displayName: empresa.nombre, estaRegistrado: true });
    return this.empresasRepository.findOne({ where: { id: usuario.id }, relations: ['representanteLegal', 'usuario'] });
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
      relations: ['usuario', 'representanteLegal'],
    });
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto, files: UploadedFilesInterfaz) {
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
      await this.usuariosService.update(empresa.usuario.id, { displayName: nuevoNombre || nombre });
    }
    
    await this.empresasRepository.update(id, updateEmpresaDto);
    return this.empresasRepository.findOneBy({ id });
  }


  async remove(id: string) {
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.softDelete({ id });
  }
}
