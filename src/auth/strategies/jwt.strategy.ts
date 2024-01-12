import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from 'src/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  private static cookieExtractor(req: Request): string | null {
    if (req && req.cookies && 'token' in req.cookies) {
      return req.cookies['token'];
    }
    return null;
  }

  async validate(payload: { id: string; email: string }) {
    return payload;
  }
}
