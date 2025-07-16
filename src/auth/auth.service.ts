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
    const { nombre, correo, password, rol = 'usuario' } = data;

    // Verificar si el correo ya está registrado
    const existe = await this.usuariosService.buscarPorCorreo(correo);
    if (existe) {
      throw new UnauthorizedException('Correo ya registrado');
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario con rol (admin o usuario)
    const nuevo = await this.usuariosService.crear({
      nombre,
      correo,
      password: passwordHash,
      rol,
    });

    return {
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: nuevo.id,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        rol: nuevo.rol,
      },
    };
  }

  async login(data: any) {
    const { correo, password } = data;

    // Buscar usuario por correo
    const usuario = await this.usuariosService.buscarPorCorreo(correo);
    if (!usuario) {
      throw new UnauthorizedException('Correo incorrecto');
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Payload del token
    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    // Generar token
    const token = await this.jwtService.signAsync(payload);

    return {
      mensaje: 'Login exitoso',
      token,
    };
  }
}
