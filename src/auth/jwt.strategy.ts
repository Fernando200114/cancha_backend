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
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto_aqui',
    });
  }

  async validate(payload: any) {
    // Aquí puedes agregar lógica extra si quieres validar más cosas
    return { userId: payload.sub, correo: payload.correo, rol: payload.rol };
  }
}
