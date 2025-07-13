// src/tarjetas/tarjeta.schema.ts

import { Schema } from 'mongoose';

export const TarjetaSchema = new Schema({
  jugadorId: { type: String, required: true }, // Referencia al jugador
  partidoId: { type: String, required: true }, // Referencia al partido
  minuto: { type: Number, required: true }, // Minuto en el que se dio
  tipo: { type: String, enum: ['amarilla', 'roja'], required: true }, // Tipo: amarilla o roja
  fecha: { type: Date, default: Date.now }, // Fecha del registro
});
