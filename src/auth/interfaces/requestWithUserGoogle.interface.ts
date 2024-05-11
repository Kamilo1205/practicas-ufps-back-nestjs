import { Request } from 'express';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export interface RequestWithUserGoogle extends Request {
  user: {
    email: string;
    picture: string;
  };
}
