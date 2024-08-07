import { Injectable } from '@nestjs/common';
import { CreateInformeDto } from './dto/create-informe.dto';
import { UpdateInformeDto } from './dto/update-informe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Informe } from './entities/informe.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class InformeService {
  constructor(
    @InjectRepository(Informe) private readonly informeRepository: Repository<Informe>,
  ) {}

  async create(createInformeDto: CreateInformeDto): Promise<Informe> {
    const informe = this.informeRepository.create(createInformeDto);
    return this.informeRepository.save(informe);
  }

  async findAll(): Promise<Informe[]> {
    return this.informeRepository.find();
  }

  async findOne(id: string): Promise<Informe> {
    return this.informeRepository.findOneBy({ id });
  }

  async update(id: string, updateInformeDto: UpdateInformeDto): Promise<Informe> {
    await this.informeRepository.update(id, updateInformeDto);
    return this.informeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.informeRepository.delete(id);
  }

  async aprobarInformeTutorEmpresarial(id: string, usuario: Usuario) {
    const informe = await this.findOne(id);
    return this.informeRepository.save({ ...informe, tutorAprobo: usuario.tutor });
  }

  async aprobarInformeTutorInstitucional(id: string, usuario: Usuario) {
    const informe = await this.findOne(id);
    return this.informeRepository.save({ ...informe, tutorAprobo: usuario.tutorInstitucional });
  }
}
