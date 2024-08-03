import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CiudadesService } from 'src/ciudades/ciudades.service';
import { EpsService } from 'src/eps/eps.service';
import { TipoAfiliacionEpsService } from 'src/tipo-afiliacion-eps/tipo-afiliacion-eps.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { EstudianteAreaInteresService } from 'src/estudiante-area-interes/estudiante-area-interes.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { HerramientasService } from 'src/herramientas/herramientas.service';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';
import { GrupoPractica } from 'src/grupo-practicas/entities/grupo-practica.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    private readonly ciudadesService: CiudadesService,
    private readonly epsService: EpsService, 
    private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService,
    private readonly tipoDocumentoService: TipoDocumentoService,
    private readonly areasInteresService: AreasInteresService,
    private readonly estudianteAreaInteresService: EstudianteAreaInteresService,
    private readonly googleDriveService: GoogleDriveService,
    private readonly semestreService: SemestreService,
    private readonly usuariosService: UsuariosService,
    private readonly herramientasService: HerramientasService
  ) {}

  async createEstudiante(usuario: Usuario, grupoMatriculado: GrupoPractica) {
    const semestreActual = await this.semestreService.getSemestreActual();
    const estudiante = this.estudianteRepository.create({ 
      id: usuario.id,
      usuario,
      grupoMatriculado,
      semestres: [semestreActual]
    });
    return this.estudianteRepository.save(estudiante);
  }

  async registro(createEstudianteDto: CreateEstudianteDto, usuario: Usuario, files: any) {
    const estudianteBd = await this.estudianteRepository.findOne({ 
      where: { id: usuario.estudiante.id }, 
      relations: ['usuario', 'grupoMatriculado', 'semestres']
    });

    const [
      ciudadResidencia, 
      eps, 
      lugarExpedicionDocumento, 
      tipoAfiliacionEps, 
      tipoDocumento,
      semestreActual
    ] = await Promise.all([
      this.ciudadesService.findOne(createEstudianteDto.ciudadResidenciaId),
      this.epsService.findOne(createEstudianteDto.epsId),
      this.ciudadesService.findOne(createEstudianteDto.lugarExpedicionDocumentoId),
      this.tipoAfiliacionEpsService.findOne(createEstudianteDto.tipoAfiliacionEpsId),
      this.tipoDocumentoService.findOne(createEstudianteDto.tipoDocumentoId),
      this.semestreService.getSemestreActual()
    ]);

    const { certificadoAfiliacionEps, documentoIdentidad, hojaDeVida, horarioClase } = files;
    const [ primerNombre, segundoNombre = '' ] = createEstudianteDto.nombre.split(' ', 2);
    const [ primerApellido, segundoApellido = '' ] = createEstudianteDto.apellidos.split(' ', 2);

    const folderNombre = `${createEstudianteDto.nombre} ${createEstudianteDto.apellidos} - ${createEstudianteDto.codigo}`;
    
    const grupoFolderId = await this.googleDriveService.createFolderIfNotExist(estudianteBd.grupoMatriculado.nombre, semestreActual.googleDriveFolderId);
    const folderEstudianteId = await this.googleDriveService.createFolderIfNotExist(folderNombre, grupoFolderId);
    
    const [ certificadoAfiliacionEpsUrl, documentoIdentidadUrl, hojaDeVidaUrl, horarioClaseUrl ] = await Promise.all([
      this.googleDriveService.uploadAndReplaceFile(`Camara_Comercio`, [folderEstudianteId], certificadoAfiliacionEps[0]),
      this.googleDriveService.uploadAndReplaceFile(`Rut`, [folderEstudianteId], documentoIdentidad[0]),
      this.googleDriveService.uploadAndReplaceFile(`Documento_Identidad`, [folderEstudianteId], hojaDeVida[0]),
      this.googleDriveService.uploadAndReplaceFile(`Solicitud_Convenio`, [folderEstudianteId], horarioClase[0])
    ]); 

    const herramientas = await Promise.all(
      createEstudianteDto.herramientas.map(async (herramientaId) => {
        const herramienta = await this.herramientasService.findOne(herramientaId);
        return herramienta;
      }),
    );

    const estudiante = this.estudianteRepository.create({ 
      ...estudianteBd,
      ...createEstudianteDto, 
      primerNombre, 
      segundoNombre,
      primerApellido, 
      segundoApellido,
      ciudadResidencia,
      eps,
      lugarExpedicionDocumento,
      certificadoAfiliacionEpsUrl,
      documentoIdentidadUrl,
      hojaDeVidaUrl,
      horarioClaseUrl,
      tipoAfiliacionEps,
      tipoDocumento,
      herramientas
    });
    await this.usuariosService.update(usuario.id, { displayName: `${createEstudianteDto.nombre} ${createEstudianteDto.apellidos}`, estaRegistrado: true });
    const savedEstudiante = await this.estudianteRepository.save(estudiante);

    if (createEstudianteDto.areasInteres && createEstudianteDto.areasInteres.length > 0) {
      await Promise.all(createEstudianteDto.areasInteres.map(async areaInteresEstudiante => {
        const areaInteres = await this.areasInteresService.findOne(areaInteresEstudiante.areaInteresId);
        return this.estudianteAreaInteresService.create({
          estudiante: savedEstudiante,
          areaInteres: areaInteres,
          nivelInteres: areaInteresEstudiante.nivelInteres,
        });
      }));
    }

    return savedEstudiante;
  }

  async agregarEstudianteASemestre(estudianteId: string) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteId },
      relations: ['semestres'],
    });
    const semestre = await this.semestreService.getSemestreActual();
    estudiante.semestres.push(semestre);
    return this.estudianteRepository.save(estudiante);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.estudianteRepository, {
      sortableColumns: ['id', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'fechaCreacion', 'fechaActualizacion', 'fechaEliminacion', 'usuario.email', 'grupoMatriculado'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'grupoMatriculado', 'usuario.email', 'codigo', 'eps.nombre', 'usuario.estaActivo', 'tipoAfiliacionEps.nombre', 'ciudadResidencia.nombre', 'numeroDocumento'],
      relations: ['usuario', 'ciudadResidencia', 'eps', 'lugarExpedicionDocumento', 'tipoAfiliacionEps', 'tipoDocumento', 'estudianteAreaInteres', 'herramientas', 'semestres', 'asignaciones', 'asignaciones.solicitud', 'asignaciones.solicitud.semestre'],
      withDeleted: true,
      filterableColumns: {
        primerNombre: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        segundoNombre: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        primerApellido: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        segundoApellido: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        grupoMatriculado: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        "usuario.estaActivo": [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        "usuario.email": [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        "semestres.id": [FilterOperator.EQ],
      },
    });
  }

  findOne(id: string) {
    return this.estudianteRepository.findOne({ 
      where: { id }, 
      relations: [
        'usuario', 
        'ciudadResidencia', 
        'ciudadResidencia.departamento', 
        'ciudadResidencia.departamento.pais',
        'eps',
        'tipoDocumento',
        'tipoAfiliacionEps',
        'semestres',
        'estudianteAreaInteres',
        'herramientas',
        'asignaciones',
      ] 
    });
  }

  async findAllSemestreActual() {
    const semestreActual = await this.semestreService.getSemestreActual();
    return this.estudianteRepository.find({
      where: {
        semestres: {
          id: semestreActual.id
        }
      },
      relations: ['semestres', 'estudianteAreaInteres', 'estudianteAreaInteres.areaInteres', 'herramientas']
    });
  }

  async remove(id: string) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id }, withDeleted: true });
    if (!estudiante) throw new NotFoundException(`El estudiante con el id ${id} no fue encontrado`);
    return this.estudianteRepository.softDelete(id);
  }

  async restore(id: string) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id }, withDeleted: true });
    if (!estudiante) throw new NotFoundException(`El estudiante con el id ${id} no fue encontrado`);
    return this.estudianteRepository.restore(id);
  }
}
