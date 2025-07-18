// src/equipos/dto/update-equipo.dto.ts

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateEquipoDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly ciudad?: string;

  @IsOptional()
  @IsString()
  readonly entrenador?: string;

  @IsOptional()
  @IsString()
  readonly escudoUrl?: string;

  @IsOptional()
  @IsNumber()
  readonly puntos?: number;
}
