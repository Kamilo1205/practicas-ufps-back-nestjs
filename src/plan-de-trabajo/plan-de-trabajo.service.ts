import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { PlanDeTrabajo } from './entities/plan-de-trabajo.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SemestreService } from 'src/semestre/semestre.service';

@Injectable()
export class PlanDeTrabajoService {
  constructor(
    @InjectRepository(PlanDeTrabajo)
    private readonly planDeTrabajoRepository: Repository<PlanDeTrabajo>,
    private readonly estudiantesService: EstudiantesService,
    private readonly semestreService: SemestreService
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
    return this.planDeTrabajoRepository.find({ 
      relations: ['estudiante', 'actividades', 'objetivo', 'intensidadHoraria'], 
      withDeleted: true, 
      where: { semestre: { id: semestreActual.id } }
    });
  }

  async findOne(id: string) {
    const planDeTrabajo = await this.planDeTrabajoRepository.findOne({ 
      where: { id }, 
      relations: ['estudiante', 'actividades', 'objetivo', 'intensidadHoraria'], 
      withDeleted: true
    });
    if (!planDeTrabajo) throw new NotFoundException(`PlanDeTrabajo con ID ${id} no encontrado`);
    return planDeTrabajo;
  }
  
  async findOneMe(id: string, usuario: Usuario) {
    const planDeTrabajo = await this.planDeTrabajoRepository.findOne({ 
      where: { id, estudiante: { id: usuario.estudiante.id } }, 
      relations: ['actividades', 'objetivo', 'intensidadHoraria'], 
      withDeleted: true
    });
    if (!planDeTrabajo) throw new NotFoundException(`PlanDeTrabajo con ID ${id} no encontrado`);
    return planDeTrabajo;
  }

  async findAllByEstudiante(usuario: Usuario) {
    return this.planDeTrabajoRepository.find({ 
      relations: ['actividades', 'objetivo'], 
      withDeleted: true,
      where: { estudiante: { id: usuario.estudiante.id } } 
    });
  }

  async findOneByEstudiante(id: string, usuario: Usuario) {
    return this.planDeTrabajoRepository.findOne({ 
      relations: ['objetivo', 'actividades', 'intensidadHoraria'], 
      withDeleted: true,
      where: { id, estudiante: { id: usuario.estudiante.id } } 
    });
  }

  async findOneByEstudianteBySemestreActual(usuario: Usuario) {
    const semestreActual = await this.semestreService.getSemestreActual();
    return this.planDeTrabajoRepository.findOne({ 
      relations: ['actividades', 'objetivo', 'intensidadHoraria'], 
      withDeleted: true, 
      where: { estudiante: { id: usuario.estudiante.id}, semestre: { id: semestreActual.id } }
    });
  }

  async findOrCreatePlanDeTrabajo(estudianteId: string, semestreId: string) {
    let planDeTrabajo = await this.planDeTrabajoRepository.findOne({
      where: { estudiante: { id: estudianteId }, semestre: { id: semestreId } },
      relations: ['objetivo'],
    });

    if (!planDeTrabajo) {
      const estudiante = await this.estudiantesService.findOne(estudianteId);
      const semestre = await this.semestreService.findOne(semestreId);

      planDeTrabajo = this.planDeTrabajoRepository.create({ estudiante, semestre });
      planDeTrabajo = await this.planDeTrabajoRepository.save(planDeTrabajo);
    }

    return planDeTrabajo;
  }
}
