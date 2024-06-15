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

  async create(createEstudianteDto: CreateEstudianteDto, usuario: Usuario, files: any) {
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
    
    const grupoFolderId = await this.googleDriveService.createFolderIfNotExist(createEstudianteDto.grupoMatriculado, semestreActual.googleDriveFolderId);
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
      usuario,
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

  findAll(grupo?: string) {
    const whereCondition = grupo ? { grupoMatriculado: grupo } : {};
    
    return this.estudianteRepository.find({
      relations: ['usuario', 'ciudadResidencia', 'ciudadResidencia.departamento'],
      where: whereCondition
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
        'herramientas'
      ] 
    });
  }

  //TODO: Actualizar areas interes
  update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
    //return this.estudianteRepository.update(id, updateEstudianteDto);
  }

  async remove(id: string) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) throw new NotFoundException(`El estudiante con el id ${id} no fue encontrado`);
    return this.estudianteRepository.softRemove(estudiante);
  }
}
