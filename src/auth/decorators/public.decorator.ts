import { SetMetadata } from '@nestjs/common';

// Define una clave personalizada para el decorador de acceso público
export const IS_PUBLIC_KEY = 'isPublic';
// Decorador que marca una ruta o controlador como público
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
