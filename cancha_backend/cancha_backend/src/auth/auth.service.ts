import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // Busca por el nombre del equipo
    const user = await this.usersService.findByTeamName(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crea el token JWT con id y teamName
    const payload = { id: user.id, teamName: user.teamName };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto) {
    // Hashea la contraseña antes de guardar (buena práctica)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Crea el usuario con la contraseña hasheada
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const payload = { id: user.id, teamName: user.teamName };
    return { access_token: this.jwtService.sign(payload) };
  }
}
