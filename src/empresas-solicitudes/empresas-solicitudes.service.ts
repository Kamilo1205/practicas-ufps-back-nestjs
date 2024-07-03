import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';
import { CreateEmpresaSolicitudDto } from './dto';
import { EmpresaSolicitud } from './entities/empresas-solicitud.entity';
import { EmpresasService } from 'src/empresas/empresas.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SemestreService } from 'src/semestre/semestre.service';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { HerramientasService } from 'src/herramientas/herramientas.service';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';

@Injectable()
export class EmpresasSolicitudesService {
  
  constructor(
    @InjectRepository(EmpresaSolicitud) private readonly empresaSolicitudRepository: Repository<EmpresaSolicitud>,
    private readonly empresaService: EmpresasService,
    private readonly semestreService: SemestreService,
    private readonly areasInteresService: AreasInteresService,
    private readonly herramientasService: HerramientasService,
    private readonly estudiantesService: EstudiantesService
  ) {}

  async create(createEmpresasSolicitudeDto: CreateEmpresaSolicitudDto, usuario: Usuario) {
    const { areasInteresIds, herramientasIds, cantidadPracticantes } = createEmpresasSolicitudeDto;

    const [empresa, semestreActual] = await Promise.all([
      this.empresaService.findOne(usuario.empresa.id),
      this.semestreService.getSemestreActual()
    ]);

    const totalSolicitudes = empresa.solicitudes.filter(solicitud => solicitud.semestre.id === semestreActual.id)
      .reduce((acc, solicitud) => acc + solicitud.cantidadPracticantes, 0);

    const cuposRestantes = 3 - totalSolicitudes;
    if (Number(totalSolicitudes) + Number(cantidadPracticantes) > 3) 
      throw new BadRequestException(`La cantidad máxima de practicantes por semestre es 3. Ya has solicitado ${totalSolicitudes}. Puedes solicitar ${cuposRestantes} practicante(s) más.`);

    const [areasInteres, herramientas] = await Promise.all([
      this.areasInteresService.findByIds(areasInteresIds),
      this.herramientasService.findByIds(herramientasIds)
    ]);

    const empresaSolicitud = this.empresaSolicitudRepository.create({
      ...createEmpresasSolicitudeDto,
      areasInteres,
      cantidadPracticantes,
      empresa,
      herramientas,
      semestre: semestreActual, 
    });

    return this.empresaSolicitudRepository.save(empresaSolicitud);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.empresaSolicitudRepository, {
      sortableColumns: ['id', 'empresa.nombreComercial', 'empresa.nombreLegal', 'fechaCreacion', 'fechaActualizacion', 'fechaEliminacion'],
      nullSort: 'last',
      searchableColumns: ['empresa.nombreComercial', 'empresa.nombreLegal', 'areasInteres.nombre', 'herramientas.nombre'],
      relations: ['areasInteres', 'empresa', 'herramientas', 'semestre', 'asignaciones', 'asignaciones.estudiante', 'asignaciones.tutor'],
      withDeleted: true,
      filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        "empreas.id": [FilterOperator.EQ],
        "empresa.nombreComercial": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "empresa.nombreLegal": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "semestre.id": [FilterOperator.EQ],
        "semestre.anio": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "areasInteres.nombre": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "herramientas.nombre": [FilterOperator.EQ, FilterOperator.CONTAINS],
      },
    });
  }

  async findOne(id: string) {
    const empresaSolicitud = await this.empresaSolicitudRepository.findOne({
      where: { id },
      relations: ['areasInteres', 'empresa', 'herramientas', 'semestre', 'asignaciones.estudiante', 'asignaciones.tutor'],
      withDeleted: true,
    });
    if (!empresaSolicitud) throw new NotFoundException(`La solicitud de empresa con id ${id} no fue encontrada`);
    return empresaSolicitud;
  }

  findAllByEmpresaId(query: PaginateQuery, usuario: Usuario) {
    return paginate(query, this.empresaSolicitudRepository, {
      sortableColumns: ['id', 'empresa.nombreComercial', 'empresa.nombreLegal', 'fechaCreacion', 'fechaActualizacion', 'fechaEliminacion'],
      nullSort: 'last',
      searchableColumns: ['empresa.nombreComercial', 'empresa.nombreLegal', 'areasInteres.nombre', 'herramientas.nombre'],
      relations: ['areasInteres', 'empresa', 'herramientas', 'semestre', 'asignaciones', 'asignaciones.estudiante', 'asignaciones.tutor'],
      withDeleted: true,
      filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        "empreas.id": [FilterOperator.EQ],
        "empresa.nombreComercial": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "empresa.nombreLegal": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "semestre.id": [FilterOperator.EQ],
        "semestre.anio": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "areasInteres.nombre": [FilterOperator.EQ, FilterOperator.CONTAINS],
        "herramientas.nombre": [FilterOperator.EQ, FilterOperator.CONTAINS],
      },
      where: { empresa: { id: usuario.empresa.id || usuario.id } }
    });
  }

  findOneByEmpresaId(id: string, usuario: Usuario) {
    return this.empresaSolicitudRepository.find({
      where: { id, empresa: { id: usuario.empresa.id } },
      relations: ['areasInteres', 'empresa', 'herramientas', 'semestre', 'asignaciones', 'asignaciones.estudiante', 'asignaciones.tutor'],
      withDeleted: true,
    });
  }

  async findBestMatchesForSolicitud(solicitudId: string): Promise<{ estudiante: Estudiante; score: number }[]> {
    const solicitud = await this.empresaSolicitudRepository.findOne({ 
      where: { id: solicitudId },
      relations: ['areasInteres', 'herramientas'] 
    });
    const estudiantes = await this.estudiantesService.findAllSemestreActual();

    const matches = estudiantes.map(estudiante => ({
      estudiante,
      score: this.calculateMatchScore(estudiante, solicitud),
    }));

    matches.sort((a, b) => b.score - a.score);
    return matches;
  }

  calculateMatchScore(estudiante: Estudiante, solicitud: EmpresaSolicitud): number {
    let score = 0;
    // Calcular puntaje de áreas de interés
    for (const estArea of estudiante.estudianteAreaInteres) {
      const empArea = solicitud.areasInteres.find(area => area.id === estArea.areaInteres.id);
      if (empArea && estArea.nivelInteres > 3) {
        score += estArea.nivelInteres; // Nivel de interés del estudiante
      }
    }
    // Calcular puntaje de herramientas
    for (const estHerramienta of estudiante.herramientas) {
      if (solicitud.herramientas.some(herr => herr.id === estHerramienta.id)) {
        score += 1; // Puntuación para herramientas coincidentes
      }
    }
    return score;
  }

  async remove(id: string) {
    const empresaSolicitud = await this.empresaSolicitudRepository.findOne({ where: { id } });
    if (!empresaSolicitud) throw new NotFoundException(`La solicitud de empresa con id ${id} no fue encontrada`);
    return this.empresaSolicitudRepository.softDelete(id);
  }

  async removeByEmpresa(id: string, usuario: Usuario) {
    const empresaSolicitud = await this.empresaSolicitudRepository.findOne({ where: { id, empresa: { id: usuario.empresa.id } } });
    if (!empresaSolicitud) throw new NotFoundException(`La solicitud de empresa con id ${id} no fue encontrada`);
    return this.empresaSolicitudRepository.softDelete(id);
  }
}
