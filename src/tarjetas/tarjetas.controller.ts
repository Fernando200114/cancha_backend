// src/tarjetas/tarjetas.controller.ts

import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';

@Controller('tarjetas') // Ruta base: /tarjetas
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Get()
  findAll() {
    return this.tarjetasService.findAll(); // Lista todas las tarjetas
  }

  @Get('jugador/:jugadorId')
  findByJugador(@Param('jugadorId') jugadorId: string) {
    return this.tarjetasService.findByJugador(jugadorId); // Lista por jugador
  }

  @Post()
  create(@Body() dto: CreateTarjetaDto) {
    return this.tarjetasService.create(dto); // Registra una tarjeta
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarjetasService.remove(id); // Elimina una tarjeta
  }
}
