// src/tarjetas/dto/create-tarjeta.dto.ts

export class CreateTarjetaDto {
  readonly jugadorId: string; // ID del jugador
  readonly partidoId: string; // ID del partido
  readonly minuto: number; // Minuto en el que se sacó la tarjeta
  readonly tipo: 'amarilla' | 'roja'; // Tipo de tarjeta
}
