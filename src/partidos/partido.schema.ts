// // src/partidos/partido.schema.ts

// import { Schema } from 'mongoose';

// export const PartidoSchema = new Schema({
//   equipoLocalId: { type: String, required: true },         // ID del equipo local
//   equipoVisitanteId: { type: String, required: true },     // ID del equipo visitante
//   fecha: { type: String, required: true },                 // Fecha y hora del partido
//   lugar: { type: String, required: true },                 // Lugar del partido
//   golesLocal: { type: Number, default: 0 },                // Goles del local
//   golesVisitante: { type: Number, default: 0 },            // Goles del visitante
//   jugado: { type: Boolean, default: false }, 
// });


// src/partidos/partido.schema.ts

import { Schema } from 'mongoose';

export const PartidoSchema = new Schema({
  equipoLocalId: { type: String, required: true },
  equipoVisitanteId: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: false }, // <-- nuevo
  lugar: { type: String, required: true },
  golesLocal: { type: Number, default: 0 },
  golesVisitante: { type: Number, default: 0 },
  estado: {
    type: String,
    enum: ['programado', 'jugado', 'cancelado'],
    default: 'programado',
  }, // <-- nuevo
  liga: { type: String, required: false }, // <-- nuevo
  arbitro: { type: String, required: false }, // <-- nuevo
  jugado: { type: Boolean, default: false }, // este lo puedes eliminar si usas "estado"
});
