import { BadRequestException } from '@nestjs/common';
 
export class FilesNotFoundException extends BadRequestException {
  constructor() {
    super('El archivo camara y rut son necesarios');
  }
}