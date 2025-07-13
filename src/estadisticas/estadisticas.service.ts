// src/estadisticas/estadisticas.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // Para usar modelos con Mongoose
import { Model } from 'mongoose';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectModel('Jugador') private readonly jugadorModel: Model<any> // Inyecta el modelo Jugador
  ) {}

  async jugadoresConMasGoles(limit = 5) {
    return this.jugadorModel.find().sort({ goles: -1 }).limit(limit).exec(); 
    // Busca todos los jugadores, ordenados por goles descendente, y limita el resultado
  }

  async jugadoresConMasTarjetas(limit = 5) {
    return this.jugadorModel.aggregate([
      {
        $project: {
          nombre: 1,
          equipo: 1,
          totalTarjetas: {
            $add: ['$tarjetasAmarillas', '$tarjetasRojas'] // Suma amarillas y rojas
          }
        }
      },
      { $sort: { totalTarjetas: -1 } }, // Ordena por total de tarjetas
      { $limit: limit } // Limita los resultados
    ]);
  }
}
