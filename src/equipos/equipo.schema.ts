// src/equipos/equipo.schema.ts

// import { Schema } from 'mongoose'; // Importa Schema de mongoose


// export const EquipoSchema = new Schema({
//   nombre: { type: String, required: true }, // Nombre del equipo
//   ciudad: { type: String, required: true }, // Ciudad del equipo
//   entrenador: { type: String, required: true }, // Entrenador
//   escudoUrl: { type: String, default: '' }, // Imagen del escudo (opcional)
//   puntos: { type: Number, default: 0 }, // Puntos acumulados en la tabla
// });


// src/equipos/equipo.schema.ts

import { Schema } from 'mongoose';

// Define el schema para el modelo "Equipo"
export const EquipoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    ciudad: { type: String, required: true },
    entrenador: { type: String, required: true },
    escudoUrl: { type: String, default: null },
    puntos: { type: Number, default: 0 },
  },
  {
    versionKey: false, // Evita agregar "__v" a los documentos
  }
);


