// src/tabla-posiciones/tabla-posiciones.controller.ts

import { Controller, Get } from '@nestjs/common';
import { TablaPosicionesService } from './tabla-posiciones.service';

@Controller('tabla-posiciones') // Ruta base
export class TablaPosicionesController {
  constructor(private readonly tablaService: TablaPosicionesService) {}

  @Get()
  obtenerTabla() {
    return this.tablaService.calcularTabla(); // GET /tabla-posiciones
  }
}
