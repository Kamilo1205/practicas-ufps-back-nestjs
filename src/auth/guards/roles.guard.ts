import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../usuarios/enums/role.enum';

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
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se especifican roles requeridos, se permite el acceso.
    if (!requiredRoles) {
      return true;
    }

    // Obtiene el usuario desde la solicitud HTTP
    const { user } = context.switchToHttp().getRequest();
  
    // Comprueba si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some((role) => user.rol == role);
  }
}
