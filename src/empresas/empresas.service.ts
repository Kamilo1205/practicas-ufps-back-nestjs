import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateEmpresaDto, UpdateEmpresaDto } from './dto';
import { EmpresaExistsException, EmpresaNotFoundException, UsuarioAlreadyHasEmpresaException } from './exceptions';
import { Empresa } from './entities/empresa.entity';
import { UploadedFiles as UploadedFilesInterfaz } from './interfaces';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RepresentanteLegalService } from 'src/representante-legal/representante-legal.service';
import { CiudadesService } from 'src/ciudades/ciudades.service';
import { IndustriasService } from 'src/industrias/industrias.service';
import { MailService } from 'src/mail/mail.service';
import { PaginateQuery, paginate } from 'nestjs-paginate';

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
    private readonly mailService: MailService
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto, usuario: Usuario, files: UploadedFilesInterfaz) {
    if (usuario.empresa) throw new UsuarioAlreadyHasEmpresaException(usuario.id);
    const { nit, nombreLegal } = createEmpresaDto;
    const exisitingEmpresa = await this.empresasRepository.findOneBy({ nit });
    if (exisitingEmpresa) throw new EmpresaExistsException(nit);

    const { camara, rut, documentoIdentidad, convenio } = files;
    const folderNombre = `${nit}-${nombreLegal}`;
    
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
    await this.usuariosService.update(usuario.id, { displayName: empresa.nombreComercial, estaRegistrado: true })
    
    const emailAttachments = [ camara[0], rut[0], documentoIdentidad[0], convenio[0] ];

    this.mailService.sendSolicitudConvenioEmail(empresa, emailAttachments);
    return this.empresasRepository.findOne({ where: { id: usuario.id }, relations: ['representanteLegal', 'usuario'] });
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.empresasRepository, {
      sortableColumns: ['id', 'nombreComercial', 'nombreLegal', 'usuario.email', 'nit'],
      nullSort: 'last',
      relations: ['usuario', 'ciudad', 'industria', 'representanteLegal'],
      defaultSortBy: [['id', 'DESC']],
      withDeleted: true,
    });
  }

  async findOne(id: string) {
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (!empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.findOne({
      where: { id },
      relations: [
        'usuario', 
        'representanteLegal', 
        'ciudad', 
        'ciudad.departamento',
        'ciudad.departamento.pais', 
        'industria',
        'solicitudes',
        'solicitudes.asignaciones',
        'solicitudes.asignaciones.estudiante'
      ],
    });
  }

  async findTutoresByEmpresaId(id: string) {
    const empresa = await this.empresasRepository.findOne({
      where: { id },
      relations: ['tutores'], // Asegúrate de incluir la relación
    });
    
    if (!empresa) throw new EmpresaNotFoundException(id);
    return empresa.tutores;
  }

  async updateEstadoUsuario(id: string, estado: boolean) {
    return await this.usuariosService.update(id, { estaActivo: estado });
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.empresasRepository.findOne({ where: { id }, relations: ['usuario', 'ciudad', 'industria'] });
    if (!empresa) throw new EmpresaNotFoundException(id);
    
    const { nit, nombreLegal, googleDriveFolderId: folderEmpresaId } = empresa;
    const { nit: nuevoNit, nombreLegal: nuevoNombre, ciudadId, industriaId } = updateEmpresaDto;
    
    if (nuevoNit && empresa.nit != nuevoNit) {
      const exisitingEmpresa = await this.empresasRepository.findOneBy({ nit });
      if (exisitingEmpresa) throw new EmpresaExistsException(nit);
    }
    
    if (nuevoNit || nuevoNombre) {
      const nombreFolder = `${nuevoNit || nit}-${nuevoNombre || nombreLegal}`;
      await this.googleDriveService.renameFolder(folderEmpresaId, nombreFolder);
      await this.usuariosService.update(empresa.usuario.id, { displayName: nuevoNombre || nombreLegal });
    }

    const [ciudad, industria] = await Promise.all([
      ciudadId && ciudadId != empresa.ciudad.id ? this.ciudadesService.findOne(ciudadId): empresa.ciudad,
      industriaId && industriaId != empresa.industria.id ?  this.industriasService.findOne(industriaId): empresa.industria
    ]);

    await this.empresasRepository.update(id, { ...updateEmpresaDto, ciudad, industria });
    return this.empresasRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'ciudad', 'ciudad.departamento', 'ciudad.departamento.pais', 'industria'] 
    });
  }

  async remove(id: string) {
    const empresa = await this.empresasRepository.findOneBy({ id });
    if (!empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.softDelete(id);
  }

  async restore(id: string) {
    const empresa = await this.empresasRepository.findOne({ where: { id }, withDeleted: true });
    if (!empresa) throw new EmpresaNotFoundException(id);
    return this.empresasRepository.restore(id);
  }

  async findPracticantesByEmpresaId(empresaId: string) {
    const empresa = await this.findOne(empresaId);
    const solicitudes = empresa.solicitudes.filter((solicitud) => solicitud.semestre.actual);
    return solicitudes.flatMap(solicitud => solicitud.asignaciones.map(asignacion => asignacion.estudiante));
  }

  async deshabilitarTutor(empresaId: string, tutorId: string) {
    const empresa = await this.empresasRepository.findOne({ where: { id: empresaId }, relations: ['tutores', 'tutores.usuario']});
    
    const tutor = empresa.tutores.find(t => t.id === tutorId);
    if (!tutor) throw new UnauthorizedException('El tutor no pertenece a esta empresa');
    await this.usuariosService.update(tutor.usuario.id, { estaActivo: false });
  }

  async habilitarTutor(empresaId: string, tutorId: string) {
    const empresa = await this.empresasRepository.findOne({ where: { id: empresaId }, relations: ['tutores', 'tutores.usuario']});
    
    const tutor = empresa.tutores.find(t => t.id === tutorId);
    if (!tutor) throw new UnauthorizedException('El tutor no pertenece a esta empresa');
    await this.usuariosService.update(tutor.usuario.id, { estaActivo: true });
  }

  async subirConvenio(empresaId: string, file: Express.Multer.File) {
    const empresa = await this.empresasRepository.findOne({ where: { id: empresaId } });
    const convenioUrl = await this.googleDriveService.uploadAndReplaceFile(`Convenio`, [empresa.googleDriveFolderId], file[0]);
    return this.empresasRepository.save({ ...empresa, convenioActivo: true, convenioUrl });
  }
}
