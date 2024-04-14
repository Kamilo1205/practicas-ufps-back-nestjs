import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    const { password } = createUsuarioDto;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;
    return this.usuariosRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usuariosRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
    });

    return { data, total };
  }

  findOne(id: string) {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { password } = updateUsuarioDto;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    return this.usuariosRepository.update(id, {
      ...updateUsuarioDto,
      ...(hashedPassword && { password: hashedPassword }),
    });
  }

  remove(id: string) {
    return this.usuariosRepository.softDelete({ id });
  }
}
