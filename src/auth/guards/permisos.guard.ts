import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermisos = this.reflector.get<string[]>(
      'permisos',
      context.getHandler(),
    );
    if (!requiredPermisos) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const hasPermission = requiredPermisos.every((permisoRequerido) =>
      user.permisos.some(
        (permisoUsuario) => permisoUsuario.nombre === permisoRequerido,
      ),
    );
    if (!hasPermission) {
      throw new UnauthorizedException(
        'Accesso Denegado: Permisos insuficientes',
      );
    }
    return true;
  }
}
