import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'demo-secret-key'),
    });
  }

  async validate(payload: any) {
    if (!payload.sub || !payload.email) {
      throw new Error('Invalid token');
    }
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
