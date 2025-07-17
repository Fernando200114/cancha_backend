// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secreto123',  // Aquí pones el mismo secreto que en AuthModule
    });
  }

  async validate(payload: any) {
    // Validación extra, puedes agregar si quieres
    return { userId: payload.sub, correo: payload.correo, rol: payload.rol };
  }
}
