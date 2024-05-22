import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemestreDto, UpdateSemestreDto } from './dto';
import { Semestre } from './entities/semestre.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { AnioService } from 'src/anio/anio.service';
import { Cron } from '@nestjs/schedule';

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
    const googleDriveFolderId = await this.googleDriveService.createFolder(`Semestre ${createSemestreDto.semestre}`, anio.googleDriveFolderId);
    const nuevoSemestre = this.semestreRepository.create({ ...createSemestreDto, googleDriveFolderId });
    return this.semestreRepository.save(nuevoSemestre);
  }

  findAll() {
    return this.semestreRepository.find();
  }

  findOne(id: string) {
    return this.semestreRepository.findOne({ where: { id } });
  }

  update(id: string, updateSemestreDto: UpdateSemestreDto) {
    return this.semestreRepository.update(id, updateSemestreDto);
  }

  remove(id: string) {
    return this.semestreRepository.softRemove({ id });
  }

  async getSemestreActual() {
    const fechaActual = new Date();
    const anioActual = await this.anioService.getAnioActual();
    const mesActual = fechaActual.getMonth() + 1;

    if (!anioActual) throw new Error('No hay año actual disponible');
    const numeroSemestre = mesActual >= 1 && mesActual <= 6 ? 1: 2;

    return this.semestreRepository.findOne({
      where: { anio: anioActual, semestre: numeroSemestre },
    });
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
