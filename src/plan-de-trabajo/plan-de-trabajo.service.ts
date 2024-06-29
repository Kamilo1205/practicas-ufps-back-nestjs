import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDeTrabajoDto, UpdatePlanDeTrabajoDto  } from './dto';
import { PlanDeTrabajo } from './entities/plan-de-trabajo.entity';
import { Repository } from 'typeorm';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { IntensidadHoraria } from './entities/intensidad-horaria.entity';

@Injectable()
export class PlanDeTrabajoService {
  constructor(
    @InjectRepository(PlanDeTrabajo)
    private readonly planDeTrabajoRepository: Repository<PlanDeTrabajo>,
    @InjectRepository(IntensidadHoraria)
    private readonly intensidadHorarioRepository: Repository<IntensidadHoraria>,
    private readonly estudiantesService: EstudiantesService,
  ) {}

  async create(usuario: Usuario, createPlanDeTrabajoDto: CreatePlanDeTrabajoDto): Promise<PlanDeTrabajo> {
    const estudiante = await this.estudiantesService.findOne(usuario.id);
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    
    const intensidadHorario = this.intensidadHorarioRepository.create({
      horario: createPlanDeTrabajoDto.intensidadHorario.horario,
      cantidadSemanas: createPlanDeTrabajoDto.intensidadHorario.cantidadSemanas,
    });

    await this.intensidadHorarioRepository.save(intensidadHorario);

    const planDeTrabajo = this.planDeTrabajoRepository.create({
      ...createPlanDeTrabajoDto,
      estudiante,
      intensidadHorario,
    });

    return this.planDeTrabajoRepository.save(planDeTrabajo);
  }

  async findAll() {
    return this.planDeTrabajoRepository.find({ relations: ['estudiante', 'actividades', 'intensidadHorario'] });
  }

  async findOne(id: string) {
    const planDeTrabajo = await this.planDeTrabajoRepository.findOne({ where: { id }, relations: ['estudiante', 'actividades', 'intensidadHorario'] });
    if (!planDeTrabajo) throw new NotFoundException(`PlanDeTrabajo con ID ${id} no encontrado`);
    return planDeTrabajo;
  }

  async remove(id: string){
    const planDeTrabajo = await this.findOne(id);
    return await this.planDeTrabajoRepository.remove(planDeTrabajo);
  }
}
