import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstudianteAreaIntereDto, UpdateEstudianteAreaIntereDto } from './dto';
import { EstudianteAreaInteres } from './entities/estudiante-area-interes.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { EstudianteAreaInteresExistsException, EstudianteAreaInteresNotFoundException } from './exceptions';

@Injectable()
export class EstudianteAreaInteresService {
  constructor(
    @InjectRepository(EstudianteAreaInteres)
    private readonly estudianteAreaInteresRepository: Repository<EstudianteAreaInteres>,
    private readonly estudiantesService: EstudiantesService,
    private readonly areaInteresService: AreasInteresService,
  ) {}

  async create(createEstudianteAreaIntereDto: CreateEstudianteAreaIntereDto) {
    const { estudianteId, areaInteresId } = createEstudianteAreaIntereDto;
    const estudiante = await this.estudiantesService.findOne(estudianteId);
    const areaInteres = await this.areaInteresService.findOne(areaInteresId);
    
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOne({ where: { estudiante, areaInteres } });
    if (estudianteAreaInteres) throw new EstudianteAreaInteresExistsException(estudianteId, areaInteresId);
    return this.estudianteAreaInteresRepository.save(createEstudianteAreaIntereDto);
  }

  findAll() {
    return this.estudianteAreaInteresRepository.find();
  }

  async findOne(id: string) {
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOneBy({ id });
    if (!estudianteAreaInteres) throw new EstudianteAreaInteresNotFoundException(id);
    return estudianteAreaInteres;
  }

  async update(id: string, updateEstudianteAreaIntereDto: UpdateEstudianteAreaIntereDto) {
    const existingestudianteAreaInteres = await this.estudianteAreaInteresRepository.findOneBy({ id });
    if (!existingestudianteAreaInteres) throw new EstudianteAreaInteresNotFoundException(id);
    
    const { estudianteId, areaInteresId } = updateEstudianteAreaIntereDto;
    const estudiante = await this.estudiantesService.findOne(estudianteId);
    const areaInteres = await this.areaInteresService.findOne(areaInteresId);
    
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOne({ where: { estudiante, areaInteres } });
    if (estudianteAreaInteres && estudianteAreaInteres.id != id) throw new EstudianteAreaInteresExistsException(estudianteId, areaInteresId);
    
    await this.estudianteAreaInteresRepository.update(id, updateEstudianteAreaIntereDto);
    return this.estudianteAreaInteresRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOneBy({ id });
    if (!estudianteAreaInteres) throw new EstudianteAreaInteresNotFoundException(id);
    return this.estudianteAreaInteresRepository.remove(estudianteAreaInteres);
  }
}
