import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          // 1. Coba ambil dari cookie
          let token = req?.cookies?.access_token;

          // 2. Fallback ke header Authorization
          if (!token && req?.headers?.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.slice(7);
          }

          return token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'Farpel29',
    });
  }

  async validate(payload: any) {
    if (!payload?.id || !payload?.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
