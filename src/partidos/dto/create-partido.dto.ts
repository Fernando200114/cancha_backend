// src/partidos/dto/create-partido.dto.ts

export class CreatePartidoDto {
  readonly equipoLocalId: string;       // ID del equipo local
  readonly equipoVisitanteId: string;   // ID del equipo visitante
  readonly fecha: string;               // Fecha del partido (en formato ISO)
  readonly lugar: string;               // Lugar del encuentro
  readonly golesLocal?: number;         // Goles del equipo local
  readonly golesVisitante?: number;     // Goles del equipo visitante
}
