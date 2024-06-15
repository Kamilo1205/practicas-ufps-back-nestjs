import { Injectable } from '@nestjs/common';
import { CreateEmpresaSolicitudDto, UpdateEmpresaSolicitudDto } from './dto';

@Injectable()
export class EmpresasSolicitudesService {
  create(createEmpresasSolicitudeDto: CreateEmpresaSolicitudDto) {
    return 'This action adds a new empresasSolicitude';
  }

  findAll() {
    return `This action returns all empresasSolicitudes`;
  }

  findOne(id: string) {
    return `This action returns a #${id} empresasSolicitude`;
  }

  update(id: string, updateEmpresasSolicitudeDto: UpdateEmpresaSolicitudDto) {
    return `This action updates a #${id} empresasSolicitude`;
  }

  remove(id: string) {
    return `This action removes a #${id} empresasSolicitude`;
  }
}
