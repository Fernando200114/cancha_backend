// src/jugadores/jugadores.schema.ts

import { Schema } from 'mongoose';

export const JugadorSchema = new Schema({
  nombre: { type: String, required: true }, // Nombre del jugador
  posicion: { type: String, required: true }, // Posición en el campo
  equipoId: { type: String, required: true }, // ID del equipo
  goles: { type: Number, default: 0 }, // Goles anotados
  tarjetasAmarillas: { type: Number, default: 0 }, // Tarjetas amarillas
  tarjetasRojas: { type: Number, default: 0 }, // Tarjetas rojas
});

