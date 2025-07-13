// src/jugadores/jugadores.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';

@Controller('jugadores') // Ruta base: /jugadores
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Get()
  findAll() {
    return this.jugadoresService.findAll(); // Devuelve todos los jugadores
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jugadoresService.findOne(id); // Devuelve un jugador por ID
  }

  @Post()
  create(@Body() dto: CreateJugadorDto) {
    return this.jugadoresService.create(dto); // Crea un nuevo jugador
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateJugadorDto) {
    return this.jugadoresService.update(id, dto); // Actualiza un jugador
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jugadoresService.remove(id); // Elimina un jugador
  }
}
