import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjetivoDto, UpdateObjetivoDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Objetivo } from './entities/objetivo.entity';
import { PlanDeTrabajoService } from 'src/plan-de-trabajo/plan-de-trabajo.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ObjetivosService {
  constructor(
    @InjectRepository(Objetivo)
    private readonly objetivoRepository: Repository<Objetivo>,
    private readonly planDeTrabajoService: PlanDeTrabajoService,
    private readonly semestreService: SemestreService,
  ) {}

  async create(createObjetivoDto: CreateObjetivoDto, usuario: Usuario) {
    const semestreActual = await this.semestreService.getSemestreActual();
    const planDeTrabajo =
      await this.planDeTrabajoService.findOrCreatePlanDeTrabajo(
        usuario.estudiante.id,
        semestreActual.id,
      );
    const objetivos = this.objetivoRepository.create({
      ...createObjetivoDto,
      planDeTrabajo,
    });
    return this.objetivoRepository.save(objetivos);
  }

  async update(
    id: string,
    updateObjetivoDto: UpdateObjetivoDto,
    usuario: Usuario,
  ) {
    const objetivos = await this.objetivoRepository.findOne({
      where: {
        id,
        planDeTrabajo: { estudiante: { id: usuario.estudiante.id } },
      },
    });
    if (!objetivos) throw new NotFoundException(`Objetivos con el id ${id} no encontrados`);
    return this.objetivoRepository.update(id, updateObjetivoDto);
  }
}
