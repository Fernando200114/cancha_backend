// src/estadisticas/estadisticas.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas') // Ruta base: /estadisticas
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {} // Inyecta el servicio

  @Get('goleadores') // Ruta: GET /estadisticas/goleadores
  async obtenerTopGoleadores(@Query('limit') limit: string) {
    const lim = parseInt(limit) || 5; // Si no se especifica, muestra 5
    return this.estadisticasService.jugadoresConMasGoles(lim); // Llama al servicio
  }

  @Get('tarjetas') // Ruta: GET /estadisticas/tarjetas
  async obtenerTopTarjetas(@Query('limit') limit: string) {
    const lim = parseInt(limit) || 5;
    return this.estadisticasService.jugadoresConMasTarjetas(lim); // Llama al servicio
  }
}
