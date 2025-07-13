// src/partidos/partido.schema.ts

import { Schema } from 'mongoose';

export const PartidoSchema = new Schema({
  equipoLocalId: { type: String, required: true },         // ID del equipo local
  equipoVisitanteId: { type: String, required: true },     // ID del equipo visitante
  fecha: { type: String, required: true },                 // Fecha y hora del partido
  lugar: { type: String, required: true },                 // Lugar del partido
  golesLocal: { type: Number, default: 0 },                // Goles del local
  golesVisitante: { type: Number, default: 0 },            // Goles del visitante
});
