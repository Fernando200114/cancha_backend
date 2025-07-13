// src/goles/gol.schema.ts

import { Schema } from 'mongoose'; // Importa el esquema desde mongoose

export const GolSchema = new Schema({
  jugadorId: { type: String, required: true }, // ID del jugador
  equipoId: { type: String, required: true }, // ID del equipo
  partidoId: { type: String, required: true }, // ID del partido
  minuto: { type: Number, required: true }, // Minuto en que se marcó
  fecha: { type: Date, default: Date.now }, // Fecha del registro del gol
});
