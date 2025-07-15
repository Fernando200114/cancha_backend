// src/jugadores/dto/create-jugador.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsInt, Min } from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La posición es obligatoria' })
  readonly posicion: string;

  @IsMongoId({ message: 'El equipoId debe ser un ID válido de MongoDB' })
  readonly equipoId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly goles?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly tarjetasAmarillas?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly tarjetasRojas?: number;
}
