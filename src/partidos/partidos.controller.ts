// src/partidos/partidos.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';

@Controller('partidos') // Ruta base: /partidos
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Get()
  findAll() {
    return this.partidosService.findAll(); // Lista todos los partidos
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidosService.findOne(id); // Devuelve un partido por su ID
  }

  @Post()
  create(@Body() dto: CreatePartidoDto) {
    return this.partidosService.create(dto); // Crea un nuevo partido
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePartidoDto) {
    return this.partidosService.update(id, dto); // Actualiza un partido
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partidosService.remove(id); // Elimina un partido
  }
}
