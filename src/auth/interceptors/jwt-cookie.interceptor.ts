import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class JwtCookieInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const res: Response = context.switchToHttp().getResponse();
        const req = context.switchToHttp().getRequest();

        if (!res.headersSent) {
          if (data.accessToken) {
            const accessToken = data.accessToken || req.user.accessToken;
            const refreshToken = data.refreshToken || req.user.refreshToken;
            this.attachCookies(res, accessToken, refreshToken);
          }
          if (data.redirectUrl) {
            return res.redirect(data.redirectUrl);
          }
        }
      }),
    );
  }

  private attachCookies(
    res: Response,
    accessToken: string,
    refreshToken?: string,
  ) {
    const accessTokenExpiry = this.configService.get<number>(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    const refreshTokenExpiry = this.configService.get<number>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // Asegura la cookie en producción
      maxAge: accessTokenExpiry * 1000,
      path: '/',
    });

    if (refreshToken) {
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: refreshTokenExpiry * 1000,
        path: '/',
      });
    }
  }
}
