import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anio } from './entities/anio.entity';
import { CreateAnioDto, UpdateAnioDto } from './dto';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AnioService {
  constructor(
    @InjectRepository(Anio)
    private anioRepository: Repository<Anio>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly configService: ConfigService,
  ) {}

  async create(createAnioDto: CreateAnioDto) {
    const folderStudiantesId = this.configService.get<string>('FOLDER_ESTUDIANTES_ID');
    const googleDriveFolderId = await this.googleDriveService.createFolder(`${createAnioDto.anio}`, folderStudiantesId);
    const nuevoAnio = this.anioRepository.create({ ...createAnioDto, googleDriveFolderId });
    return this.anioRepository.save(nuevoAnio);
  }

  findAll() {
    return this.anioRepository.find();
  }

  findOne(id: string) {
    return this.anioRepository.findOne({ where: { id } });
  }

  update(id: string, updateAnioDto: UpdateAnioDto) {
    return this.anioRepository.update(id, updateAnioDto);
  }

  remove(id: string) {
    return this.anioRepository.softRemove({ id });
  }

  async getAnioActual() {
    const anioActual = new Date().getFullYear();
    return this.anioRepository.findOne({ where: { anio: anioActual } });
  }

  @Cron('0 0 0 1 1 *')
  async handleCronNuevoAnio() {
    const anioActual = new Date().getFullYear();
    await this.create({ anio: anioActual });
  }
}
