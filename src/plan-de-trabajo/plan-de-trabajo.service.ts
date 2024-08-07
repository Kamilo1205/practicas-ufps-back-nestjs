import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { PlanDeTrabajo } from './entities/plan-de-trabajo.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SemestreService } from 'src/semestre/semestre.service';
import { TutorInstitucionalService } from 'src/tutor-institucional/tutor-institucional.service';
import { TutoresService } from 'src/tutores/tutores.service';
import { AsignacionService } from 'src/asignacion/asignacion.service';
import { Resultado } from './entities/resultados.entity';
import { CreateResultadoDto, CreateResultadosDto, UpdatePlanDeTrabajoDto, UpdateResultadoDto } from './dto';
import { CreateInformeDto } from 'src/informe/dto/create-informe.dto';
import { InformeService } from 'src/informe/informe.service';

@Injectable()
export class PlanDeTrabajoService {
  constructor(
    @InjectRepository(PlanDeTrabajo)
    private readonly planDeTrabajoRepository: Repository<PlanDeTrabajo>,
    private readonly estudiantesService: EstudiantesService,
    private readonly semestreService: SemestreService,
    private readonly tutorInstitucionalService: TutorInstitucionalService,
    private readonly tutorEmpresarialService: TutoresService,
    private readonly asignacionService: AsignacionService,
    private readonly informeService: InformeService
  ) {}

  async findAll(query: PaginateQuery) {
    return paginate(query, this.planDeTrabajoRepository, {
      sortableColumns: ['id', 'estudiante.id', 'semestre.id', 'semestre.anio.actual', 'asignacion'],
      nullSort: 'last',
      relations: ['estudiante', 'semestre'],
      defaultSortBy: [['id', 'DESC']],
      withDeleted: true,
    });
  }

  async findAllSemestreActual() {
    const semestreActual = await this.semestreService.getSemestreActual();
    return this.planDeTrabajoRepository.findOne({ 
      relations: [
        'estudiante', 
        'seccionActividades',
        'seccionActividades.comentarios', 
        'seccionActividades.actividades',
        'seccionActividades.actividades.subActividades', 
        'objetivo',
        'objetivo.comentarios', 
        'intensidadHoraria',
        'asignacion'
      ], 
      withDeleted: true, 
      where: { semestre: { id: semestreActual.id } }
    });
  }

  async findOne(id: string) {
    const planDeTrabajo = await this.planDeTrabajoRepository.findOne({ 
      where: { id }, 
      relations: [
        'estudiante', 
        'seccionActividades',
        'seccionActividades.comentarios', 
        'seccionActividades.actividades',
        'seccionActividades.actividades.subActividades', 
        'objetivo',
        'objetivo.comentarios', 
        'intensidadHoraria',
        'asignacion'
      ], 
      withDeleted: true
    });
    if (!planDeTrabajo) throw new NotFoundException(`PlanDeTrabajo con ID ${id} no encontrado`);
    return planDeTrabajo;
  }
  
  async findOneMe(id: string, usuario: Usuario) {
    const planDeTrabajo = await this.planDeTrabajoRepository.findOne({ 
      where: { id, estudiante: { id: usuario.estudiante.id } }, 
      relations: [
        'estudiante', 
        'seccionActividades',
        'seccionActividades.comentarios', 
        'seccionActividades.actividades',
        'seccionActividades.actividades.subActividades', 
        'objetivo',
        'objetivo.comentarios', 
        'intensidadHoraria'
      ], 
      withDeleted: true
    });
    if (!planDeTrabajo) throw new NotFoundException(`PlanDeTrabajo con ID ${id} no encontrado`);
    return planDeTrabajo;
  }

  async findAllByEstudiante(usuario: Usuario) {
    return this.planDeTrabajoRepository.find({ 
      relations: [
        'seccionActividades',
        'seccionActividades.actividades', 
        'seccionActividades.actividades.subActividades',
        'seccionActividades.comentarios',
        'objetivo',
        'objetivo.comentarios', 
        'asignacion'
      ], 
      withDeleted: true,
      where: { estudiante: { id: usuario.estudiante.id } } 
    });
  }

  async findOneByEstudiante(id: string, usuario: Usuario) {
    return this.planDeTrabajoRepository.findOne({ 
      relations: [
        'intensidadHoraria',
        'seccionActividades',
        'seccionActividades.actividades', 
        'seccionActividades.actividades.subActividades',
        'seccionActividades.comentarios', 
        'objetivo',
        'objetivo.comentarios',
        'asignacion'
      ], 
      withDeleted: true,
      where: { id, estudiante: { id: usuario.estudiante.id } } 
    });
  }

  async findOneByEstudianteBySemestreActual(usuario: Usuario) {
    const semestreActual = await this.semestreService.getSemestreActual();
    return this.findOrCreatePlanDeTrabajo(usuario.estudiante.id, semestreActual.id);
  }

  async findOrCreatePlanDeTrabajo(estudianteId: string, semestreId: string) {
    let planDeTrabajo = await this.planDeTrabajoRepository.findOne({
      where: { estudiante: { id: estudianteId }, semestre: { id: semestreId } },
      relations: [
        'intensidadHoraria',
        'seccionActividades', 
        'seccionActividades.actividades',
        'seccionActividades.actividades.subActividades', 
        'seccionActividades.comentarios', 
        'objetivo',
        'objetivo.comentarios',
        'asignacion'
      ],
    });

    if (!planDeTrabajo) {
      const estudiante = await this.estudiantesService.findOne(estudianteId);
      const semestre = await this.semestreService.findOne(semestreId);
      const asignacion = await this.asignacionService.findEstudianteIdAndSemestreActual(estudianteId);

      planDeTrabajo = this.planDeTrabajoRepository.create({ estudiante, semestre, asignacion });
      planDeTrabajo = await this.planDeTrabajoRepository.save(planDeTrabajo);
    }

    return planDeTrabajo;
  }

  async aprobarPorTutorEmpresarial(id: string, tutorEmpresarialId: string) {
    const planTrabajo = await this.findOne(id);
    const tutorEmpresarial = await this.tutorEmpresarialService.findOne(tutorEmpresarialId);
    return this.planDeTrabajoRepository.save({ ...planTrabajo, tutorEmpresarial });
  }

  // Aprobar el plan de trabajo por el tutor institucional
  async aprobarPorTutorInstitucional(id: string, tutorInstitucionalId: string)  {
    const planTrabajo = await this.findOne(id);
    const tutorInstitucional = await this.tutorInstitucionalService.findOne(tutorInstitucionalId);
    return this.planDeTrabajoRepository.save({ ...planTrabajo, tutorInstitucional });
  }

  async agregarResultados(planDeTrabajoId: string, createResultadosDto: CreateResultadosDto) {
    const planDeTrabajo = await this.findOne(planDeTrabajoId);
    return this.planDeTrabajoRepository.save({ ...planDeTrabajo, resultados: createResultadosDto.resultados });
  }

  async update(planDeTrabajoId: string, updatePlanDeTrabajoDto: UpdatePlanDeTrabajoDto) {
    const planDeTrabajo = await this.findOne(planDeTrabajoId);
    return this.planDeTrabajoRepository.save({ ...planDeTrabajo, updatePlanDeTrabajoDto });
  }

  async createPrimerInforme(createPrimerInformeDto: CreateInformeDto, usuario: Usuario) {
    const planDeTrabajo = await this.findOneByEstudianteBySemestreActual(usuario);
    const primerInforme = await this.informeService.create(createPrimerInformeDto);
    return this.planDeTrabajoRepository.save({ ...planDeTrabajo, primerInforme });
  }

  async createInformeFinal(createPrimerInformeDto: CreateInformeDto, usuario: Usuario) {
    const planDeTrabajo = await this.findOneByEstudianteBySemestreActual(usuario);
    const informeFinal = await this.informeService.create(createPrimerInformeDto);
    return this.planDeTrabajoRepository.save({ ...planDeTrabajo, informeFinal });
  }
}
