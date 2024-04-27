import { NotFoundException } from '@nestjs/common';
 
export class PermisosNotFoundException extends NotFoundException {
  constructor(permisosIds: string[]) {
    super([
        `Los siguientes permisos no se pudieron encontrar: ${permisosIds.join(', ')}`,
    ]);
  }
}