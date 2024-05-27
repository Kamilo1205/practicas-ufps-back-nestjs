import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { CreateAnioDto, UpdateAnioDto } from './dto';
import { Anio } from './entities/anio.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Injectable()
export class AnioService {
  constructor(
    @InjectRepository(Anio)
    private anioRepository: Repository<Anio>,
    private readonly googleDriveService: GoogleDriveService,
    private readonly configService: ConfigService,
  ) {}

  async create(createAnioDto: CreateAnioDto) {
    const { anio } = createAnioDto;
    const anioExiste = await this.anioRepository.findOne({ where: { anio } });
    if (anioExiste) throw new BadRequestException(`El año ${ anio } ya esta registrado`);

    const folderStudiantesId = this.configService.get<string>('FOLDER_ESTUDIANTES_ID');
    const googleDriveFolderId = await this.googleDriveService.createFolder(`${createAnioDto.anio}`, folderStudiantesId);
    const nuevoAnio = this.anioRepository.create({ ...createAnioDto, googleDriveFolderId });
    return this.anioRepository.save(nuevoAnio);
  }

  findAll() {
    return this.anioRepository.find();
  }

  async findOne(id: string) {
    const anio = await this.anioRepository.findOne({ where: { id } });
    if (anio) throw new NotFoundException(`El año con el id ${ id } no fue encontrado`);
    return anio;
  }

  async update(id: string, updateAnioDto: UpdateAnioDto) {
    const anio = await this.anioRepository.findOne({ where: { id } });
    if (anio) throw new NotFoundException(`El año con el id ${ id } no fue encontrado`);
    this.anioRepository.update(id, updateAnioDto);
    return this.anioRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const anio = await this.anioRepository.findOne({ where: { id } });
    if (anio) throw new NotFoundException(`El año con el id ${ id } no fue encontrado`);
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
