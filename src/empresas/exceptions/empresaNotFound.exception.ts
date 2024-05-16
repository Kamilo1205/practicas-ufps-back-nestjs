import { NotFoundException } from '@nestjs/common';
 
export class EmpresaNotFoundException extends NotFoundException {
  constructor(empresaId?: string) {
    super(`Empresa con id ${ empresaId } no encontrada`); 
  }
}