import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudianteAreaInteresDto, UpdateEstudianteAreaInteresDto } from './dto';
import { EstudianteAreaInteres } from './entities/estudiante-area-interes.entity';

@Injectable()
export class EstudianteAreaInteresService {
  constructor(
    @InjectRepository(EstudianteAreaInteres)
    private readonly estudianteAreaInteresRepository: Repository<EstudianteAreaInteres>,
  ) {}

  async create(createEstudianteAreaInteresDto: CreateEstudianteAreaInteresDto) {
    const { estudiante, areaInteres } = createEstudianteAreaInteresDto;

    const interesExiste = await this.estudianteAreaInteresRepository.findOne({
      where: { estudiante: { id: estudiante.id }, areaInteres: { id: areaInteres.id } },
    });
    if (interesExiste) {
      throw new ConflictException(`El interés ya está registrado para el estudiante y área de interés especificados`);
    }

    const estudianteAreaInteres = this.estudianteAreaInteresRepository.create(createEstudianteAreaInteresDto);
    return this.estudianteAreaInteresRepository.save(estudianteAreaInteres);
  }

  findAll() {
    return this.estudianteAreaInteresRepository.find({ relations: ['estudiante', 'areaInteres'] });
  }

  async findOne(id: string) {
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOne({
      where: { id },
      relations: ['estudiante', 'areaInteres'],
    });
    if (!estudianteAreaInteres) {
      throw new NotFoundException(`El interés con el id ${id} no fue encontrado`);
    }
    return estudianteAreaInteres;
  }

  async update(id: string, updateEstudianteAreaInteresDto: UpdateEstudianteAreaInteresDto) {
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOne({ where: { id } });
    if (!estudianteAreaInteres) throw new NotFoundException(`El interés con el id ${id} no fue encontrado`);

    const { estudiante, areaInteres } = updateEstudianteAreaInteresDto;
    if (
      (estudiante && estudiante.id !== estudianteAreaInteres.estudiante.id) ||
      (areaInteres && areaInteres.id !== estudianteAreaInteres.areaInteres.id)
    ) {
      const interesConMismaRelacion = await this.estudianteAreaInteresRepository.findOne({
        where: { estudiante: { id: estudiante.id }, areaInteres: { id: areaInteres.id } },
      });
      if (interesConMismaRelacion && interesConMismaRelacion.id !== id) {
        throw new ConflictException(`El interés ya está registrado para el estudiante y área de interés especificados`);
      }
    }

    Object.assign(estudianteAreaInteres, updateEstudianteAreaInteresDto);
    await this.estudianteAreaInteresRepository.save(estudianteAreaInteres);
    return this.estudianteAreaInteresRepository.findOne({ where: { id }, relations: ['estudiante', 'areaInteres'] });
  }

  async remove(id: string) {
    const estudianteAreaInteres = await this.estudianteAreaInteresRepository.findOne({ where: { id } });
    if (!estudianteAreaInteres) throw new NotFoundException(`El interés con el id ${id} no fue encontrado`);
    return this.estudianteAreaInteresRepository.softRemove(estudianteAreaInteres);
  }
}
