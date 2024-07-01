import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { CreateSemestreDto, UpdateSemestreDto } from './dto';
import { Semestre } from './entities/semestre.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { AnioService } from 'src/anio/anio.service';

@Injectable()
export class SemestreService {
  constructor(
    @InjectRepository(Semestre)
    private readonly semestreRepository: Repository<Semestre>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly anioService: AnioService,
  ) {}

  async create(createSemestreDto: CreateSemestreDto) {
    const anio = await this.anioService.findOne(createSemestreDto.anioId);

    const { semestre } = createSemestreDto;
    const semestreExiste = await this.semestreRepository.findOne({ where: { anio, semestre } });
    if( semestreExiste ) throw new BadRequestException({ semestre: `El semestre ${ semestre } del año ${anio} ya existe` });
    
    const googleDriveFolderId = await this.googleDriveService.createFolder(`Semestre ${createSemestreDto.semestre}`, anio.googleDriveFolderId);
    const nuevoSemestre = this.semestreRepository.create({ ...createSemestreDto, anio, googleDriveFolderId });
    return this.semestreRepository.save(nuevoSemestre);
  }

  findAll() {
    return this.semestreRepository.find({ relations: ['anio'] });
  }

  async findOne(id: string) {
    const semestre = await this.semestreRepository.findOne({ where: { id }, relations: ['anio'] });
    if (!semestre) throw new NotFoundException(`El semestre con id ${ id } no fue encontrado`);
    return semestre;
  }

  async update(id: string, updateSemestreDto: UpdateSemestreDto) {
    const semestre = await this.semestreRepository.findOne({ where: { id }, relations: ['anio'] });
    if (semestre) throw new NotFoundException(`El semestre con id ${ id } no fue encontrado`);
    await this.semestreRepository.update(id, updateSemestreDto);
    return this.semestreRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const semestre = await this.semestreRepository.findOne({ where: { id }, relations: ['anio'] });
    if (semestre) throw new NotFoundException(`El semestre con id ${ id } no fue encontrado`);
    return this.semestreRepository.softDelete(id);
  }

  async getSemestreActual() {
    const fechaActual = new Date();
    const anioActual = await this.anioService.getAnioActual();
    const mesActual = fechaActual.getMonth() + 1;

    if (!anioActual) throw new NotFoundException('No hay año actual disponible');
    const numeroSemestre = mesActual >= 1 && mesActual <= 6 ? 1: 2;

    let semestreActual = await this.semestreRepository.findOne({
      where: {
        semestre: numeroSemestre,
        anio: { id: anioActual.id },
      },
      relations: ['anio'],
    });
    
    if (!semestreActual) semestreActual = await this.create({ anioId: anioActual.id, semestre: numeroSemestre });
    
    return semestreActual;
  }

  @Cron('0 0 0 1 1,7 *')
  async handleCronNuevoSemestre() {
    const fechaActual = new Date();
    const anioActual = await this.anioService.getAnioActual();
    const mesActual = fechaActual.getMonth() + 1;

    const numeroSemestre = mesActual >= 1 && mesActual <= 6 ? 1: 2;
    await this.create({ anioId: anioActual.id, semestre: numeroSemestre, fechaInicio: null, fechaFin: null });
  }
}
