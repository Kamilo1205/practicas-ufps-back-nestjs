import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/rol.enum';

// Define una clave personalizada para el decorador de roles
export const ROLES_KEY = 'roles';
// Decorador que asigna roles específicos a una ruta o controlador
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
