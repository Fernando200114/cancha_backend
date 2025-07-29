// import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId, IsIn } from 'class-validator';
// import { Type } from 'class-transformer'; // ✅ Import necesario para transformar los números

// export class CreatePartidoDto {
//   @IsMongoId({ message: 'equipoLocalId debe ser un ID Mongo válido' })
//   readonly equipoLocalId: string; // ID del equipo local

//   @IsMongoId({ message: 'equipoVisitanteId debe ser un ID Mongo válido' })
//   readonly equipoVisitanteId: string; // ID del equipo visitante

//   @IsString()
//   @IsNotEmpty({ message: 'La fecha es obligatoria' })
//   readonly fecha: string; // Fecha del partido (ISO string)

//   @IsString()
//   @IsNotEmpty({ message: 'El lugar es obligatorio' })
//   readonly lugar: string; // Lugar del encuentro

//   @IsOptional()
//   @Type(() => Number) // ✅ Transforma string a number
//   @IsNumber({}, { message: 'golesLocal debe ser un número' })
//   readonly golesLocal?: number; // Goles del equipo local

//   @IsOptional()
//   @Type(() => Number) // ✅ Transforma string a number
//   @IsNumber({}, { message: 'golesVisitante debe ser un número' })
//   readonly golesVisitante?: number; // Goles del equipo visitante

// // Aquí agregas el nuevo campo
//   @IsString()
//   @IsNotEmpty()
//   @IsIn(['programado', 'jugado', 'cancelado'], {
//     message: 'estado debe ser "programado", "jugado" o "cancelado"',
//   })
//   readonly estado: string;
// }

import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePartidoDto {
  @IsMongoId({ message: 'equipoLocalId debe ser un ID Mongo válido' })
  readonly equipoLocalId: string;

  @IsMongoId({ message: 'equipoVisitanteId debe ser un ID Mongo válido' })
  readonly equipoVisitanteId: string;

  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  readonly fecha: string;

  @IsString()
  @IsNotEmpty({ message: 'El lugar es obligatorio' })
  readonly lugar: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'golesLocal debe ser un número' })
  readonly golesLocal?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'golesVisitante debe ser un número' })
  readonly golesVisitante?: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['programado', 'jugado', 'cancelado'], {
    message: 'estado debe ser "programado", "jugado" o "cancelado"',
  })
  readonly estado: string;

  @IsOptional()
  @IsString()
  readonly liga?: string;

  @IsOptional()
  @IsString()
  readonly arbitro?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly hora?: string; // <-- nuevo campo hora
}

