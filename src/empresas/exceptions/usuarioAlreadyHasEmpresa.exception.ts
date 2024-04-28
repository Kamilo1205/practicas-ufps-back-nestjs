import { ConflictException } from '@nestjs/common';

export class UsuarioAlreadyHasEmpresaException extends ConflictException {
  constructor(usuarioId: string) {
    super(`El usuario con ID ${usuarioId} ya tiene una empresa registrada.`);
  }
}
