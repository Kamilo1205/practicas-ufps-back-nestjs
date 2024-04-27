import { NotFoundException } from '@nestjs/common';
 
export class UsuarioNotFoundException extends NotFoundException {
  constructor(usuarioId: string) {
    super(`Usuario con id ${ usuarioId } no encontrado`);
  }
}