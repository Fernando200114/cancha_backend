// src/jugadores/jugadores.schema.ts
import { Schema, Types } from 'mongoose';

export const JugadorSchema = new Schema({
  nombre: { type: String, required: true },
  posicion: { type: String, required: true },
  equipoId: { type: Types.ObjectId, ref: 'Equipo', required: true }, // ← CORREGIDO
  goles: { type: Number, default: 0 },
  tarjetasAmarillas: { type: Number, default: 0 },
  tarjetasRojas: { type: Number, default: 0 },
});
