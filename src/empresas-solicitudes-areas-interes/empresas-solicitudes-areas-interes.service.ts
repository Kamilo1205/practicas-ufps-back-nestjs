import { Injectable } from '@nestjs/common';
import { CreateEmpresaSolicitudAreaInteresDto, UpdateEmpresSolicitudAreaInteresDto } from './dto';

@Injectable()
export class EmpresasSolicitudesAreasInteresService {
  create(createEmpresaSolicitudAreaInteresDto: CreateEmpresaSolicitudAreaInteresDto) {
    return 'This action adds a new empresasSolicitudesAreasIntere';
  }

  findAll() {
    return `This action returns all empresasSolicitudesAreasInteres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresasSolicitudesAreasIntere`;
  }

  update(id: number, updateEmpresaSolicitudAreaInteresDto: UpdateEmpresSolicitudAreaInteresDto) {
    return `This action updates a #${id} empresasSolicitudesAreasIntere`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresasSolicitudesAreasIntere`;
  }
}
