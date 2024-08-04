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

@Injectable()
export class PlanDeTrabajoService {
  constructor(
    @InjectRepository(PlanDeTrabajo)
    private readonly planDeTrabajoRepository: Repository<PlanDeTrabajo>,
    private readonly estudiantesService: EstudiantesService,
    private readonly semestreService: SemestreService,
    private readonly tutorInstitucionalService: TutorInstitucionalService,
    private readonly tutorEmpresarialService: TutoresService
  ) {}

  async findAll(query: PaginateQuery) {
    return paginate(query, this.planDeTrabajoRepository, {
      sortableColumns: ['id', 'estudiante.id', 'semestre.id', 'semestre.anio.actual'],
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
        'seccionActividades.subActividades', 
        'objetivo',
        'objetivo.comentarios', 
        'intensidadHoraria'
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
        'seccionActividades.subActividades', 
        'objetivo',
        'objetivo.comentarios', 
        'intensidadHoraria'
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
        'seccionActividades.comentarios', 
        'objetivo',
        'objetivo.comentarios'
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
        'seccionActividades.comentarios', 
        'objetivo',
        'objetivo.comentarios'
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
        'seccionActividades.comentarios', 
        'objetivo',
        'objetivo.comentarios'
      ],
    });

    if (!planDeTrabajo) {
      const estudiante = await this.estudiantesService.findOne(estudianteId);
      const semestre = await this.semestreService.findOne(semestreId);

      planDeTrabajo = this.planDeTrabajoRepository.create({ estudiante, semestre });
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
}
