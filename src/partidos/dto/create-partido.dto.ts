// src/partidos/dto/create-partido.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId } from 'class-validator';

export class CreatePartidoDto {
  @IsMongoId({ message: 'equipoLocalId debe ser un ID Mongo válido' })
  readonly equipoLocalId: string;       // ID del equipo local

  @IsMongoId({ message: 'equipoVisitanteId debe ser un ID Mongo válido' })
  readonly equipoVisitanteId: string;   // ID del equipo visitante

  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  readonly fecha: string;               // Fecha del partido (ISO string)

  @IsString()
  @IsNotEmpty({ message: 'El lugar es obligatorio' })
  readonly lugar: string;               // Lugar del encuentro

  @IsOptional()
  @IsNumber()
  readonly golesLocal?: number;         // Goles del equipo local (opcional)

  @IsOptional()
  @IsNumber()
  readonly golesVisitante?: number;     // Goles del equipo visitante (opcional)
}
