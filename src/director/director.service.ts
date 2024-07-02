import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDirectorDto, UpdateDirectorDto } from './dto';
import { Director } from './entities/director.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    private readonly usuarioService: UsuariosService
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    const { nombres, apellidos, email } = createDirectorDto;
    const existingDirector = await this.directorRepository.findOne({ where: { nombres, apellidos } });
    if (existingDirector) throw new ConflictException(`Ya existe un director con los nombres ${nombres} y apellido ${apellidos}`);
    const usuario = await this.usuarioService.createDirector(email, `${nombres} ${apellidos}`);
    return this.directorRepository.save({ ...createDirectorDto, usuario });
  }

  findAll() {
    return this.directorRepository.find({ withDeleted: true });
  }

  async findOne(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) throw new NotFoundException(`El director con id ${id} no fue encontrado`);
    return director;
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) throw new NotFoundException(`El director con id ${id} no fue encontrado`);
    await this.directorRepository.update(id, updateDirectorDto);
    return this.directorRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) throw new NotFoundException(`El director con id ${id} no fue encontrado`);
    return this.directorRepository.softDelete(id);
  }

  async restore(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) throw new NotFoundException(`El director con id ${id} no fue encontrado`);
    return  this.directorRepository.restore(id);
  }
}
