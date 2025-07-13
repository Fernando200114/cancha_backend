// src/jugadores/dto/create-jugador.dto.ts

export class CreateJugadorDto {
  readonly nombre: string; // Nombre del jugador
  readonly posicion: string; // Posición (defensa, delantero, etc.)
  readonly equipoId: string; // ID del equipo al que pertenece
  readonly goles?: number; // Cantidad de goles anotados (opcional)
  readonly tarjetasAmarillas?: number; // Cantidad de tarjetas amarillas (opcional)
  readonly tarjetasRojas?: number; // Cantidad de tarjetas rojas (opcional)
}
