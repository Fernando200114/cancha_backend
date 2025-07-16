import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['admin', 'usuario'])
  rol?: string;
}
