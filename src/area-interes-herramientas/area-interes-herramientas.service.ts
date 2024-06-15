import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaInteresHerramientaDto, UpdateAreaInteresHerramientaDto } from './dto';
import { AreaInteresHerramienta } from './entities/area-interes-herramienta.entity';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { HerramientasService } from 'src/herramientas/herramientas.service';

@Injectable()
export class AreaInteresHerramientasService {
  constructor(
    @InjectRepository(AreaInteresHerramienta)
    private readonly areaInteresHerramientaRepository: Repository<AreaInteresHerramienta>,
    private readonly areasInteresService: AreasInteresService,
    private readonly herramientasService: HerramientasService
  ) {}

  async create(createAreaInteresHerramientaDto: CreateAreaInteresHerramientaDto) {
    const { areaInteresId, herramientaId } = createAreaInteresHerramientaDto;
    const areaInteres = await this.areasInteresService.findOne(areaInteresId);
    const herramienta = await this.herramientasService.findOne(herramientaId);

    const areaInteresHerramientaExiste = await this.areaInteresHerramientaRepository.findOne({ 
      where: { areaInteres, herramienta }
    });
    if (areaInteresHerramientaExiste) 
      throw new ConflictException('La herramienta ya esta registrada en la area de interes');
    const areaInteresHerramienta = this.areaInteresHerramientaRepository.create({
      areaInteres,
      herramienta,
    });
    return this.areaInteresHerramientaRepository.save(areaInteresHerramienta);
  }

  findAll() {
    return this.areaInteresHerramientaRepository.find({ relations: ['areaInteres', 'herramienta'] });
  }

  findOne(id: string) {
    const areaInteresHerramienta = this.areaInteresHerramientaRepository.findOne({ where: { id }, relations: ['areaInteres', 'herramienta'] });
    if (!areaInteresHerramienta) throw new NotFoundException('Asociación de área de interés y herramienta no encontrada');
    return 
  }

  async update(id: string, updateAreaInteresHerramientaDto: UpdateAreaInteresHerramientaDto): Promise<AreaInteresHerramienta> {
    const areaInteresHerramienta = await this.areaInteresHerramientaRepository.findOneBy({ id });
    if (!areaInteresHerramienta) throw new NotFoundException('Asociación de área de interés y herramienta no encontrada');

    const { areaInteresId, herramientaId } = updateAreaInteresHerramientaDto;

    if (areaInteresId && areaInteresId !== areaInteresHerramienta.areaInteres.id) {
      const areaInteres = await this.areasInteresService.findOne(areaInteresId);
      areaInteresHerramienta.areaInteres = areaInteres;
    }

    if (herramientaId && herramientaId !== areaInteresHerramienta.herramienta.id) {
      const herramienta = await this.herramientasService.findOne(herramientaId);
      areaInteresHerramienta.herramienta = herramienta;
    }

    return this.areaInteresHerramientaRepository.save(areaInteresHerramienta);
  }

  async remove(id: string) {
    const areaInteresHerramienta = await this.areaInteresHerramientaRepository.findOneBy({ id });
    if (!areaInteresHerramienta) throw new NotFoundException('Asociación de área de interés y herramienta no encontrada');
    return this.areaInteresHerramientaRepository.softDelete(areaInteresHerramienta);
  }
}
