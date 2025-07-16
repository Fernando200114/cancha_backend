import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';  // Importa el JwtStrategy

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      secret: 'secreto123',  // Ideal usar variable de entorno (.env)
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // Agrega JwtStrategy aquí
})
export class AuthModule {}
