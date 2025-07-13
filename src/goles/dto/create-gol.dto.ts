// src/goles/dto/create-gol.dto.ts

export class CreateGolDto {
  readonly jugadorId: string; // ID del jugador que anotó el gol
  readonly equipoId: string; // ID del equipo del jugador
  readonly partidoId: string; // ID del partido donde se anotó
  readonly minuto: number; // Minuto en el que se anotó el gol
}
