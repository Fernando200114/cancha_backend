// src/tabla-posiciones/tabla-posiciones.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TablaPosicionesService {
  constructor(
    @InjectModel('Partido') private readonly partidoModel: Model<any>
  ) {}

  async calcularTabla() {
    const partidos = await this.partidoModel.find().exec(); // Trae todos los partidos

    const tabla = new Map(); // Usamos un mapa para acumular por equipo

    for (const p of partidos) {
      const { equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante } = p;

      // Inicializa local
      if (!tabla.has(equipoLocalId)) {
        tabla.set(equipoLocalId, this.initEquipo());
      }
      // Inicializa visitante
      if (!tabla.has(equipoVisitanteId)) {
        tabla.set(equipoVisitanteId, this.initEquipo());
      }

      // Sumar partidos jugados
      tabla.get(equipoLocalId).PJ += 1;
      tabla.get(equipoVisitanteId).PJ += 1;

      // Sumar goles
      tabla.get(equipoLocalId).GF += golesLocal;
      tabla.get(equipoLocalId).GC += golesVisitante;

      tabla.get(equipoVisitanteId).GF += golesVisitante;
      tabla.get(equipoVisitanteId).GC += golesLocal;

      // Ver quién ganó
      if (golesLocal > golesVisitante) {
        tabla.get(equipoLocalId).PG += 1;
        tabla.get(equipoVisitanteId).PP += 1;
        tabla.get(equipoLocalId).Pts += 3;
      } else if (golesLocal < golesVisitante) {
        tabla.get(equipoVisitanteId).PG += 1;
        tabla.get(equipoLocalId).PP += 1;
        tabla.get(equipoVisitanteId).Pts += 3;
      } else {
        // Empate
        tabla.get(equipoLocalId).PE += 1;
        tabla.get(equipoVisitanteId).PE += 1;
        tabla.get(equipoLocalId).Pts += 1;
        tabla.get(equipoVisitanteId).Pts += 1;
      }
    }

    // Convertir mapa a array y calcular diferencia de goles (DG)
    const resultado = Array.from(tabla.entries()).map(([equipoId, datos]) => ({
      equipoId,
      ...datos,
      DG: datos.GF - datos.GC,
    }));

    // Ordenar por puntos, luego DG
    resultado.sort((a, b) => b.Pts - a.Pts || b.DG - a.DG);

    return resultado;
  }

  // Inicializa los campos del equipo
  private initEquipo() {
    return {
      PJ: 0, PG: 0, PE: 0, PP: 0,
      GF: 0, GC: 0, DG: 0, Pts: 0
    };
  }
}
