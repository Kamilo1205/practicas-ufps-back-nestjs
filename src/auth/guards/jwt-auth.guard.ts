import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Determina si la protección de autenticación es necesaria para una ruta o controlador.
   * @param context - El contexto de ejecución de la solicitud.
   * @returns true si se permite el acceso sin autenticación, de lo contrario, aplica la autenticación JWT.
   */
  canActivate(context: ExecutionContext) {
    // Obtiene la información sobre si la ruta o controlador es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta o controlador es público, se permite el acceso sin autenticación
    if (isPublic) {
      return true;
    }

    // Si la ruta o controlador no es público, se aplica la autenticación JWT
    return super.canActivate(context);
  }
}
