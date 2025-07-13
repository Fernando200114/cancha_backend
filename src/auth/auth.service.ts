// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const { nombre, correo, password } = data;

    const existe = await this.usuariosService.buscarPorCorreo(correo);
    if (existe) throw new UnauthorizedException('Correo ya registrado');

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevo = await this.usuariosService.crear({
      nombre,
      correo,
      password: passwordHash,
    });

    return { mensaje: 'Usuario creado', usuario: nuevo };
  }

  async login(data: any) {
    const { correo, password } = data;

    const usuario = await this.usuariosService.buscarPorCorreo(correo);
    if (!usuario) throw new UnauthorizedException('Correo incorrecto');

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: usuario.id, rol: usuario.rol };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
