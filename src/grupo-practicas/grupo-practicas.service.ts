import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGrupoPracticaDto, UpdateGrupoPracticaDto } from './dto';
import { GrupoPractica } from './entities/grupo-practica.entity';
import { TutorInstitucionalService } from 'src/tutor-institucional/tutor-institucional.service';

@Injectable()
export class GrupoPracticasService {
  constructor(
    @InjectRepository(GrupoPractica)
    private readonly grupoPracticaRepository: Repository<GrupoPractica>,
    private readonly tutorInstitucionalService: TutorInstitucionalService
  ) {}

  async create(createGrupoPracticaDto: CreateGrupoPracticaDto) {
    const { nombre } = createGrupoPracticaDto;
    const grupoPracticas = await this.grupoPracticaRepository.findOne({ where: { nombre } });
    if (grupoPracticas) throw new ConflictException(`Ya existe el grupo ${nombre}`);
    return this.grupoPracticaRepository.save(createGrupoPracticaDto);
  }

  findAll() {
    return this.grupoPracticaRepository.find({ 
      withDeleted: true,
      relations: ['tutor'] 
    });
  }

  async findOne(id: string) {
    const grupoPractica = await this.grupoPracticaRepository.findOne({ where: { id }, relations: ['tutor'] });
    if (!grupoPractica) throw new NotFoundException(`El grupo de practicas con id ${id} no encontrado`);
    return grupoPractica;
  }

  async asignarTutor(grupoId: string, tutorId: string | null) {
    const grupoPractica = await this.grupoPracticaRepository.findOne({ where: { id: grupoId } });
    if (!grupoPractica) throw new NotFoundException(`El grupo de practicas con id ${grupoId} no encontrado`);

    let tutor = null;
    if (tutorId !== null) { 
      tutor = await this.tutorInstitucionalService.findOne(tutorId);
    }
    return this.grupoPracticaRepository.update(grupoId, { tutor });
  }

  async update(id: string, updateGrupoPracticaDto: UpdateGrupoPracticaDto) {
    const grupoPractica = await this.grupoPracticaRepository.findOne({ where: { id } });
    if (!grupoPractica) throw new NotFoundException(`El grupo de practicas con id ${id} no encontrado`);
    return this.grupoPracticaRepository.update(id, updateGrupoPracticaDto);
  }

  async remove(id: string) {
    const grupoPractica = await this.grupoPracticaRepository.findOne({ where: { id } });
    if (!grupoPractica) throw new NotFoundException(`El grupo de practicas con id ${id} no encontrado`);
    return this.grupoPracticaRepository.softDelete(id);
  }
}
