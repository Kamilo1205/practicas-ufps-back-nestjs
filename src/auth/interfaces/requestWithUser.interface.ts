import { Request } from 'express';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export interface RequestWithUser extends Request {
  user: Usuario;
}
