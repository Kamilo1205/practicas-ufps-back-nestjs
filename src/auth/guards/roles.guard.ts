import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { Rol } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Guardia que permite la autorización basada en roles.
   * Comprueba si el usuario tiene los roles requeridos para acceder a una ruta o controlador.
   * Utiliza la información de roles definida en el decorador 'Roles' y el enum 'Role'.
   * @param context - El contexto de ejecución de la solicitud.
   * @returns true si el usuario tiene los roles requeridos, de lo contrario, false.
   */
  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos de la metadata de la ruta o controlador
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const hasRequiredRole = requiredRoles ? user.roles.some(rol => requiredRoles.includes(rol.nombre)) : true;
    if (!hasRequiredRole) throw new UnauthorizedException('Acceso Denegado: Rol inválido')
    return true;
  }
}
