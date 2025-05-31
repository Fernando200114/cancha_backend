import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  nombre: string;

  @IsInt()
  edad: number;

  @IsString()
  posicion: string;

  @IsInt()
  numero: number;
}
